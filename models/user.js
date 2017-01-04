const moogoose = require('mongoose');
const Schema = mongoose.Schema;

//Define model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

//Create the model class
const ModelClass = mongoose.model('user', userSchema);

//export the model
model.exports = ModelClass;