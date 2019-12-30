
const local = require('./localStrategy');
const jwt = require('./jwtStrategy');

module.exports = (passport) => {
  // passport.serializeUser((user, done) => { 
  //   done(null, user); 
  // });

  // passport.deserializeUser((user,doen) => {
  //   done(null, user);
  // })
  local(passport);  
  jwt(passport); 
}