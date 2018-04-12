

IIITKWebsite.controller('EventController', ['$scope','$window','$timeout','UIUtilityService','EventService', function ($scope,$window,$timeout,UIUtilityService,EventService) {

$scope.type_options = ["sports","cultural","scholarship","academics","admission","recruitment","research","others"];

$scope.allevents = true;
$scope.addeventpage = false;

$scope.event= {
    title:"",
    description:"",
    date:"",
    organizer:"",
    type:""
};

$scope.eventList = [];


$scope.addEventClicked = function () {
    $scope.allevents = false;
    $scope.addeventpage = true;
    $scope.event= {
        title:"",
        description:"",
        date:"",
        organizer:"",
        type:""
    };

    $scope.eventList = [];
};

$scope.goToAllEvents = function () {
    $scope.allevents = true;
    $scope.addeventpage = false;
    $scope.getEventList();
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
                $scope.goToAllEvents();
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

$scope.getTopEventList = function () {
    EventService.getEvent()
        .then(function(data){
            console.log("data:" ,data);
            if(data.data.length> 0) {
                var totalEventList = [];
                for (var i = 0; i < data.data.length; i++) {
                    var parameters = {};
                    parameters.title = data.data[i].title;
                    parameters.description = data.data[i].description;
                    parameters.date = data.data[i].date;
                    parameters.organizer = data.data[i].organizer;
                    parameters._id = data.data[i]._id;
                    parameters.type = data.data[i].type;

                    totalEventList.push(parameters);
                }
                console.log("eventlist: ",$scope.eventList);

                var revEventList = $scope.eventList.reverse();

                var i =0,len=revEventList.length;
                var second = false;
                var third = false;
                $scope.getSubString(revEventList[i].description);
                var tmp_content = {
                    title:revEventList[i].title,
                    date:revEventList[i].date,
                    description:$scope.final_string
                };
                var tmp_content1 = {
                    title:"",
                    date:"",
                    description:""
                };
                if(i+1 < len){
                    $scope.getSubString(revEventList[i+1].description);
                    tmp_content1 = {
                        title:revEventList[i+1].title,
                        date:revEventList[i+1].date,
                        description:$scope.final_string
                    };
                    second = true;
                }
                var tmp_content2 = {
                    title:"",
                    date:"",
                    description:""
                };
                if(i+2 < len){
                    $scope.getSubString(revEventList[i+2].description);
                    tmp_content2 = {
                        title:revEventList[i+2].title,
                        date:revEventList[i+2].date,
                        description:$scope.final_string
                    };
                    third = true;
                }
                $scope.topEventList = {
                    second:second,
                    third:third,
                    event1:tmp_content,
                    event2:tmp_content1,
                    event3:tmp_content2
                }

            }else{


            }
        }).catch(function(error){
        console.log("Error in fetching Events: ",error);
    })
};

$scope.getSubString = function (str) {
    $scope.final_string;
    var len = str.length;
    var max = 130;
    if(len <=max){
        $scope.final_string = str;
    }
    else{
        $scope.final_string = str.substr(0, max) + '...';
    }
};

/*Calling get Event to get all the event details posted*/
$scope.getEventList();
$scope.getTopEventList();

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
