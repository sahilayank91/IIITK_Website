IIITKWebsite.controller('CurriculumController', ['$scope','CurriculumService','$location','UIUtilityService', function ($scope,CurriculumService,$location,UIUtilityService) {

    $scope.subject =[];
    $scope.semesterlist = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eigth'];
    $scope.branchlist = ["Computer Science and Engineering","Electronics and Communication Engineering"];


    $scope.validateParameters = function(){
            if($scope.branch =="Computer Science and Engineering"){
                $scope.branch = "cse";
            }else{
                $scope.branch = "ece";
            }
    };
    $scope.subjectname= "";

    $scope.getSubjectList = function(){
        CurriculumService.getSubjectList()
            .then(function(data){
                console.log("data:",data);
                var data = data.data;

                for(var i=0;i<data.length;i++){
                    var parameter = {};
                    parameter.credits = data[i].credits;
                    parameter.subject = data[i].subject;
                    parameter.semester = data[i].semester;
                    parameter._id = data[i]._id;
                    $scope.subject.push(parameter);
                }
            }).catch(function(error){
            console.log("Error in adding subject: ",error);
        });
    };

    $scope.getSubjectList();


    $scope.addSubjectInCurriculum = function() {
        var parameter = {};
        $scope.validateParameters();
        parameter.subject = $scope.subjectname;
        parameter.semester = $scope.semester;
        parameter.branch = $scope.branch;
        parameter.credits = $scope.credits;
        CurriculumService.addSubject(parameter)
            .then(function (data) {
                $scope.subject =[];
                $scope.getSubjectList();
                UIUtilityService.NOTIFICATION.show({
                    title: "Success",
                    content: "Subject added Successfully.",
                    type: "success"
                });
            }).catch(function (err) {
            UIUtilityService.NOTIFICATION.show({
                title: "Error",
                content: "Failed to Add Subject",
                type: "error"
            });
        });

    };





        $scope.updateCurriculum = function(id){


            console.log("id: ",id);
            var parameter = {};
            $scope.validateParameters();
            parameter.subject = $scope.subjectname;
            parameter.semester = $scope.semester;
            parameter.branch = $scope.branch;
            parameter.credits = $scope.credits;
            parameter._id = id;
            CurriculumService.updateSubject(parameter)
                .then(function (data) {
                    $scope.getSubjectList();
                    UIUtilityService.NOTIFICATION.show({
                        title: "Success",
                        content: "Subject added Successfully.",
                        type: "success"
                    });
                }).catch(function (err) {
                UIUtilityService.NOTIFICATION.show({
                    title: "Error",
                    content: "Failed to Add Subject",
                    type: "error"
                });
            });

        };


}]);