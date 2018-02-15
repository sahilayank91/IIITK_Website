var User = require(__BASE__ + 'modules/database/models/user');
var customUUID = require(__BASE__ + "modules/utils/CustomUUID");
var Promise = require('bluebird');

//A template to input the data required at the registration of the user
var getCreateTemplate = function (parameters) {
    if ((!parameters.email && !parameters.phone)) {
        return {};
    }
    var template = {}
    for (var key in parameters) {
        switch (key) {
            case '_id':
            case 'username':
            case 'email':
            case 'phone':
            case 'password':
            case 'role':
            case 'secondary_email':
            case 'secondary_phone':
            case 'firstname':
            case 'lastname':
            case 'keys':
            case 'gender':
                template[key] = parameters[key];
                break;
        }
    }
    ;


    template.created_at = new Date();

    // if (parameters.password) {
    //     template.password = cryptographer.hashIt(parameters.password);
    // }

    if (!template._id) {
        template._id = customUUID.getRandomAplhaNumeric();
    }

    return template;
};

var createUser = function (parameters) {
    return new Promise(function (resolve, reject) {
        var template = getCreateTemplate(parameters);
        console.log(template);
        var user = new User(template);
        user.save(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                console.log(err);
                reject(new Error('createUser failed'));
            }
        });

    });

};

var getUsers = function (rule, fields, options) {
    return new Promise(function (resolve, reject) {
        User.find(rule, fields, options).exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(new Error('Failed to get Users'));
            }
        });
    });
};

var deleteUsers = function(rule,fields,options){
    return new Promise(function (resolve,reject){
            User.remove(rule,fields, options).exec(function(err,data){
                if(!err){
                    resolve(data);
                }else{
                    reject(new Error("Failed to delete Users"));
                }
            });
    });
};

var updateUser = function(rule,fields,options){
  return new Promise(function(resolve,reject){
    User.findOneAndUpdate(rule,fields,options).exec(function(err,data){
        if(!err){
            resolve(data);
        }else{
            reject(new Error("Failed to update Users"));
        }
    });
  });
};

var getUserById = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        User.find(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get User"));
            }
        });
    });
};

module.exports = {
    createUser: createUser,
    getUsers: getUsers,
    updateUser:updateUser,
    getUserById:getUserById
};