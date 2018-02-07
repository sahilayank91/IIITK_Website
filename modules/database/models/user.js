var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    _id: String,
    // use username as profile url. followclass/profile/harsha.
    username: {type: String, index: true, unique: true, required: true},
    email: String,
    phone: String,
    password: {type: String, required: true},
    role: {
        type: String
        // enum: [ROLES.ORGANISATION, ROLES.ADMINISTRATOR, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT]
    },
    secondary_email: String, // institite's email address for password resets
    secondary_phone: String, // parent's mobile number in case of students
    // TODO: make different default profile pics for different roles
    profile_pic: {
        medium: {type: String},
        small: {type: String},
    },

    firstname: {type: String, required: true}, //change the keys whenever firstname changes
    lastname: {type: String}, //change the keys whenever lastname changes
    // for name prefix matching
    keys: [String],
    // flag for activation
    activated: {type: Boolean, default: false},
    created_at: {type: Date, default: new Date()},
    address: String,
    gender: String,
    about: String,
    job_title: String, // can write hindi Teacher or something like that -- too many to put in enum
}, {
    minimize: false
});


module.exports = mongoose.model('User', UserSchema);
