var User = require(__BASE__ + 'modules/database/models/user');
var customUUID = require(__BASE__ + "modules/utils/CustomUUID");
var Promise = require('bluebird');
var Batch = require(__BASE__ + 'modules/database/models/batch');

//A template to input the data required at the registration of the user

var getCreateTemplate = function(parameters){
    var template = {};
    for(var key in parameters){
        switch(key){
            case 'year':
            case 'type':
            case 'branch':
            case 'students':
                 template[key] = parameters[key];
                 break;
        }
    }
    template.create_time = new Date();
    return template;
}



var getStudentList = function(rule,fields,options){
    return new Promise(function (resolve, reject) {
        Batch.find(rule, fields, options).lean().exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                console.log("/getStudentList, some error occured", err);
                reject(new Error('Failed to get FeeTypes'));
            }
        });
    });
};


var addStudentList = function(parameters){
  return new Promise(function(resolve,reject){
      var template = getCreateTemplate(parameters);
      var batch = new Batch(template);
      batch.save(function (err, data) {
          if (!err) {
              resolve(data);
          } else {
              console.log("Create Batch List, Some error occured", err);
              reject(new Error('Failed to create FeeType'));
          }
      });
  });
};

module.exports = {
    getStudentList: getStudentList,
    addStudentList: addStudentList
};