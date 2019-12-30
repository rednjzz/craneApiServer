const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    }, async (email, password, done) => {
      try {
        const exUser = await User.findOne({ where: { email} });
        if (!exUser) {
          done(null, false, { code: 409, message: '가입되지 않은 회원'});
        }
        const result = await bcrypt.compare(password, exUser.password);
        if (!result) {
          done(null, false, { code: 401, message: '비밀번호 불일치'});
        }
        done(null, exUser, { code: 200, message: '성공'}); 
      } catch (err) {
        console.log(err);
        done(err);
      }
    }));
}

