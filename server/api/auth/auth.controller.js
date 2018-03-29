const jwt = require('jsonwebtoken');
const User = require('../../models/user');

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
  } = req.body;
  let newUser = null;

  // User 객체를 생성
  const create = (user) => {
    if (user) {
      throw new Error('user name exists');
    } else {
    // TODO:
    // 비밀번호 검증
    // 비밀번호 기준에 통과했는지?
    // username 검증
    // username에 맞는 규칙이 통과됫는지?
    // 정규표현식을 사용해야함...
      return User.create(username, password, tags, profilePicture, description);
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
      message: 'registered sucessfully',
      admin: isAdmin,
    });
  };

  // Error handling
  const onError = (error) => {
    res.status(400).json({
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
              resolve(token);
            }
          },
        );
      });
      return p;
    } else {
      throw new Error('login failed');
    }
  };

  const respond = (token) => {
    res.json({
      message: 'logged in successfully',
      token,
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
  res.json({
    success: true,
    info: req.decoded,
  });
};
