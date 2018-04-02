const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;

/*

  User의 스키마.
  일단은 관리자 권한과 사용자의 아이디, 비밀번호를 넣어둠.
  필요한 것은 나중에 추가해보자.

*/

const User = new Schema({
  username: String,
  password: String,
  tags: Array,
  description: String,
  profilePicture: {
    type: String,
    default: 'default',
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const hashKey = 'thiSIsHaSh!Key';

// static functions
// do not use arrow functions : 중요!
// this를 바인딩 하지 않기 때문에 에러가 날 수 있다.

User.statics.create = function (username, password, tags, description, profilePicture) {
  const encrypted = crypto.createHmac('sha1', hashKey)
    .update(password)
    .digest('base64');
  const user = new this({
    username,
    password: encrypted,
    tags,
    description,
    profilePicture,
  });
  return user.save();
};

// Username과 일치하는 것을 찾아서 보내줌
User.statics.findOneByUsername = function (username) {
  return this.findOne({
    username,
  });
};

// instance methods
// 로그인 검증
User.methods.verify = function (password) {
  const encrypted = crypto.createHmac('sha1', hashKey)
    .update(password)
    .digest('base64');
  return encrypted === this.password;
};

// 유저에게 관리자 권한 할당
User.methods.assignAdmin = function () {
  this.admin = true;
  return this.save();
};

module.exports = mongoose.model('User', User);
