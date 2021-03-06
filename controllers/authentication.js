const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);  //sub(subject) is jwt prop, iat(issued at time)
}

exports.signin = function(req, res, next) {
  //User has already had their email authed we just need to give them token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  
  if (!email || !password) {
      return res.status(422).send ({ error: 'You must provide email and password'});
  } 
  //see if a user with the given email exist
 
  //If a user with email does exist, return
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }
  //if a user with email exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });    
    }
  //if a user does not exist, create a new user  
    const user = new User({
      email: email,
      password: password
    });       

    user.save(function(err) {
      if(err) { return next(err); }
      //Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
}