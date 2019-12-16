
const local = require('./localStrategy');
const jwt = require('./jwtStrategy');

module.exports = (passport) => {
  local(passport);  
  jwt(passport); 
}