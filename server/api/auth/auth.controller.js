const jwt = require('jsonwebtoken');
const User = require('../../models/user');


// POST /api/user/check-user username => 중복되는 유저 이름이 있는지? T/F
exports.checkUser = (req, res) => {
  User.findOneByUsername(req.body.username)
    .then((user) => {
      if (user) {
        res.json({
          exists: true,
        });
      } else {
        res.json({
          exists: false,
        });
      }
    });
};

/*

  POST /api/auth/register

*/
exports.register = (req, res) => {
  const {
    username,
    password,
    tags,
    profilePicture,
    description,
    admin,
  } = req.body;
  let newUser = null;

  const valid = (email, pw) => {
    const emailPattern = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const pwPattern = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/;
    if (!emailPattern.test(email) && pwPattern.test(pw)) {
      throw new Error('Email is invalid');
    } else if (emailPattern.test(email) && !pwPattern.test(pw)) {
      throw new Error('Password is invaild');
    } else if (!emailPattern.test(email) && !pwPattern.test(pw)) {
      throw new Error('Email and Password is invalid');
    }
  };

  // User 객체를 생성
  const create = (user) => {
    if (user) {
      throw new Error('user name exists');
    } else {
      valid(username, password);
      return User.create(username, password, tags, description, profilePicture);
    }
  };

  // 현재 유저 수를 확인하고 받은 user를 newUser에 저장
  const count = (user) => {
    newUser = user;
    return User.count({}).exec();
  };

  // user의 수가 1이라면, 새로운 유저를 관리자로 생성
  const assign = (userCount) => {
    if (userCount === 1) {
      return newUser.assignAdmin();
    }
    return Promise.resolve(false);
  };

  // 생성에 성공했다는 response를 보냄.
  const respond = (isAdmin) => {
    res.json({
      success: true,
      admin: isAdmin,
    });
  };

  // Error handling
  const onError = (error) => {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  };

  // check duplicate user, then register the user
  User.findOneByUsername(username)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError);
};

/*

  POST /api/auth/login

*/
exports.login = (req, res) => {
  const { username, password } = req.body;
  const secret = req.app.get('jwt-secret');
  const check = (user) => {
    if (!user) {
      throw new Error('login failed');
    } else if (user.verify(password)) {
      const p = new Promise((resolve, reject) => {
        jwt.sign(
          {
            _id: user._id,
            username: user.username,
            password: user.password,
            admin: user.admin,
          },
          secret,
          {
            expiresIn: '7d',
            issuer: 'lifid',
            subject: 'userInfo',
          },
          (err, token) => {
            if (err) {
              reject(err);
            } else {
              resolve({ token, user });
            }
          },
        );
      });
      return p;
    } else {
      throw new Error('login failed');
    }
  };

  const respond = (value) => {
    const { token, user } = value;
    const userData = Object.assign({}, {
      username: user.username,
      tags: user.tags,
      description: user.description,
      profilePicture: user.profilePicture,
      admin: user.admin,
      bookMark: user.bookMark,
    });
    res.json({
      message: 'logged in successfully',
      token,
      userData,
    });
  };

  const onError = (error) => {
    res.status(400).json({
      message: error.message,
    });
  };

  User.findOneByUsername(username)
    .then(check)
    .then(respond)
    .catch(onError);
};

/*

  GET /api/auth/check
  this api gets request from middleware

*/
exports.check = (req, res) => {
  User.findOneByUsername(req.decoded.username)
    .then((user) => {
      res.json({
        success: true,
        userData: {
          username: user.username,
          tags: user.tags,
          description: user.description,
          profilePicture: user.profilePicture,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
};
