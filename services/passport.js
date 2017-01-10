const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization');
    secretOrKey: config.secret
};

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {  //payload is at auth.js line 7
  //see if the userID in the payload exists in our database
  //If it does, call 'done' with that other
  //otherwise, call done without user object
  User.findById(payload.sub, function() {
    if (err) { return done(err, false); }  //if there is an error during the seach

    if (user) {
        done(null, user);
    } else {
        done(null, false); //if error doesn't exist  
    }
  });  
});

//Tell passport to use this strategy
passport.use(jwtLogin);