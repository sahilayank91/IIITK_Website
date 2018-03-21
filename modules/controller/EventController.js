var eventOperations = require(__BASE__+"modules/database/accessors/event_operations");

var getEvent = function(parameters){
    return eventOperations.getEvent(parameters)
        .then(function(Event){
            if(Event){
                return Event;
            }else{
                console.log("Event not available or Some Error occured");
            }
        });
};

var addEvent = function(parameters){
    console.log("parametersP",parameters);
    return eventOperations.createEvent(parameters)
        .then(function(data){
            if(data){
                return data;
            }else {
                console.log("Failed to add Event");
            }
        }).catch(function(error){
            console.log("Failed to Add Event:",error);
        });
};

var updateEvent = function(parameters){
    return eventOperations.updateEvent({_id:parameters._id},parameters)
        .then(function(data){
            if(data){
                return data;
            }else {
                console.log("Failed to update Event");
            }
        }).catch(function(error){
            console.log("Failed to udpate Event:",error);
        });
};

var deleteEvent = function(parameters){
    return eventOperations.deleteEvent({_id:parameters})
        .then(function(data){
            if(data){
                return data;
            }else {
                console.log("Failed to delete Event");
            }
        }).catch(function(error){
            console.log("Failed to delete Event:",error);
        });
};

module.exports = {
    getEvent:getEvent,
    addEvent:addEvent,
    updateEvent:updateEvent,
    deleteEvent:deleteEvent

};