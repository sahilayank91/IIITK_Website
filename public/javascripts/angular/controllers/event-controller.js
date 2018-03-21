

IIITKWebsite.controller('EventController', ['$scope','$window','$timeout','UIUtilityService','EventService', function ($scope,$window,$timeout,UIUtilityService,EventService) {

$scope.type_options = ["sports","cultural","scholarship","academics","admission","recruitment","research","others"];

$scope.event= {
    title:"",
    description:"",
    date:"",
    organizer:"",
    type:""
};

$scope.eventList = [];


$scope.addEvents = function(){

    var parameters = {};
    parameters.title = $scope.event.title;
    parameters.description = $scope.event.description;
    parameters.date = $scope.event.date;
    parameters.organizer = $scope.event.organizer;
    parameters.type = $scope.event.type;


    console.log(parameters);

    EventService.addEvent(parameters)
        .then(function(data){
                console.log("Data for the events: ",data);


        }).catch(function(error){
            console.log(error);
    });

};


$scope.getEventList = function(){

    EventService.getEvent()
        .then(function(data){
            console.log("data:" ,data);
            if(data.data.length> 0) {
                for (var i = 0; i < data.data.length; i++) {
                    var parameters = {};
                    parameters.title = data.data[i].title;
                    parameters.description = data.data[i].description;
                    parameters.date = data.data[i].date;
                    parameters.organizer = data.data[i].organizer;
                    parameters._id = data.data[i]._id;
                    parameters.type = data.data[i].type;

                    $scope.eventList.push(parameters);
                }
                console.log("eventlist: ",$scope.eventList);
            }else{


                }
        }).catch(function(error){
            console.log("Error in fetching Events: ",error);
    })
};

/*Calling get Event to get all the event details posted*/
$scope.getEventList();

$scope.updateEvents = function(id){
    var parameters = {};
    parameters.title = $scope.event.title;
    parameters.description = $scope.event.description;
    parameters.date = $scope.event.date;
    parameters.organizer = $scope.event.organizer;
    parameters.type = $scope.event.type;
    parameters._id = $scope.event._id;

    EventService.updateEvent(parameters)
        .then(function(data){
            if(data){
                console.log("The Event has been updated Successfully");
            }
        }).catch(function(error){
            console.log(error);
    });

};



$scope.deleteEvents= function(index){
    var _id = $scope.eventList[index]._id;
    var parameters = {};
    parameters._id = _id;
    EventService.deleteEvent(parameters)
        .then(function(data){
            console.log("Event Deleted Successfully");
            $scope.eventList = [];
            $scope.getEventList();
        }).catch(function(error){
            console.log(error);
    });
};


}]);
