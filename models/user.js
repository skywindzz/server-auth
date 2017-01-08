const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

//on save hook, encrypt password
//before saving, run this model
userSchema.pre('save', function(next) {
    //get access to the user model
    const user = this;  //user.email, user.password


    //generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
      if (err) { return next(err); }

      //hash our password using the salt
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) { return next(err); }  
        //overwrite plain text password with encrypt one
        user.password = hash;
        next();  
      });
    });
});
//Create the model class
const ModelClass = mongoose.model('user', userSchema);

//export the model
module.exports = ModelClass;