const { User } = require('../models');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = (passport) => {
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET,
  }, async (jwtPayload, done) => {
    // find the user in db if needed.
    // This functionality may be omitted if you store everything you'll need in JWT payload.
    try {
      const result = await User.findOne({ where: {id: jwtPayload.id }});
      const user = {
        id: result.id,
        nick: result.nick,
      }
      if (result) {
        return done(null, user);
      } else {
        return done(null, false, { message: '허가되지 않은 사용자 입니다'});
      }
    } catch (err) {
      console.log(err);
      done(err);
    }
  }));
}
