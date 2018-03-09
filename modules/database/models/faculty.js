var mongoose = require('mongoose');
var BRANCH = require(__BASE__ + "config/enums").branch;

var FacultySchema = new mongoose.Schema({
    _id: String,
    // use username as profile url. followclass/profile/harsha.
    email: String,
    phone: String,
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
    education:String,
    branch :{type:String,enum: [BRANCH.CSE,BRANCH.ECE,BRANCH.ME]},
    job_title: String, // can write hindi Teacher or something like that -- too many to put in enum
}, {
    minimize: false
});


module.exports = mongoose.model('Faculty', FacultySchema);
