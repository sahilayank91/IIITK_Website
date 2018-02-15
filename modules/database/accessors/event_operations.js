var Event = require(__BASE__ + 'modules/database/models/event');
var Promise = require('bluebird');

var getCreateTemplate = function(parameters){
        var template={};
        for(var key in parameters){
            switch(key){
                case 'type':
                case 'posted_by':
                case 'update_time':
                case 'content':
                    template[key] = parameters[key];
            }
        }
        template.create_time = new Date();
        return template;
};


var createEvent = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        var template = getCreateTemplate(template);
        var event = new Event(template);
        event.save(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(new Error('createUser failed'));
            }
        });
    });
};



var getEvents = function(rule,fields ,options){
  return new Promise(function(resolve,reject){
     Event.find(rule,fields,options).exec(function(err,data){
         if(!err){
             resolve(data);
         }else{
             reject(new Error("Failed to get Evenets"));
         }
     })
  });
};

var updateEvent = function(rule, fields ,options){
    return new Promise(function(resolve, reject){
        Event.findOneAndUpdate(rule,fields, options).exec(function(err, data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to update Events"));
            }
        });
    });
};

var deleteEvent = function(rule, fields ,options){
    return new Promise(function(resolve, reject){
        Event.remove(rule,fields, options).exec(function(err, data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to update Events"));
            }
        });
    });
};
module.exports = {
    createEvent:createEvent,
    getEvent:getEvents,
    updateEvent:updateEvent,
    deleteEvent:deleteEvent
}