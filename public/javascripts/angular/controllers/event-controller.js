

IIITKWebsite.controller('EventController', ['$scope','$window','$timeout','UIUtilityService','EventService', function ($scope,$window,$timeout,UIUtilityService,EventService) {

$scope.type_options = ["sports","cultural","scholarship","academics","admission","recruitment","research","others"];

$scope.event= {
    title:"",
    description:"",
    date:"",
    organizer:"",
    type:""
};

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



        }).catch(function(error){
            console.log(error);
    })









};



}]);
