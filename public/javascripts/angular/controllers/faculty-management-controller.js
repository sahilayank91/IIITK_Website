IIITKWebsite.controller('FacultyController', ['$scope','UserService','UIUtilityService','FacultyService', function ($scope,UserService,UIUtilityService,FacultyService) {
console.log("INSIDE FACULTY");
    $scope.email = "";
    $scope.branch = "";
    $scope.education = "";
    $scope.firstname="";
    $scope.lastname="";
    $scope.gender= "";
    $scope.role ="";
    $scope.phone = "";
    $scope.about = "";
       $scope.validateDetails = function(){

    };


    $scope.addFaculty = function(){
        $scope.validateDetails();

        var parameters = {
            email:$scope.email,
            firstname:$scope.firstname,
            lastname:$scope.lastname,
            education:$scope.education,
            branch:$scope.branch,
            gender:$scope.gender,
            phone:$scope.phone,
            role:$scope.role,
            type:"Faculty",
            about:$scope.about,
        };
        FacultyService.registerFaculty(parameters)
            .then(function(data){
                console.log("dlkjflaskjfsfla");
                if(data.success){
                    UIUtilityService.NOTIFICATION.show({
                        title: "Success",
                        content: "Faculty Registered Successfully",
                        type: "success"
                    });
                }

            }).catch(function(error){
            console.log("Error: ",error);
        })
    }


    $scope.faculty=[];
    $scope.getFacultyList = function(){
        FacultyService.getFacultyList()
            .then(function(result){
                 console.log(result.success);
                for(var i=0;i<result.data.length;i++){
                     console.log(result.data[i]);
                    var param = {};
                    param.id = result.data[i]._id;
                    param.name = result.data[i].firstname +" " + result.data[i].lastname;
                    param.contact = result.data[i].phone
                    param.about = result.data[i].about;
                    param.branch = result.data[i].branch;
                    param.education = result.data[i].education;
                    $scope.faculty.push(param);
                }

                console.log("Faculty: ",$scope.faculty);

            });


    };


    $scope.getFacultyList();


$scope.deleteFaculty = function(faculty_id){
    var param ={};
    param.id = faculty_id;
    FacultyService.deleteFaculty(param)
        .then(function(data){
            $scope.faculty = [];
            $scope.getFacultyList();
            if(data){
                UIUtilityService.NOTIFICATION.show({
                    title: "Success",
                    content: "Faculty Deleted Successfully",
                    type: "success"
                });
            }
        }).catch(function(err){
        UIUtilityService.NOTIFICATION.show({
            title: "Failed",
            content: "Error in Deleting Faculty. Please Try Again",
            type: "error"
        });
    })

}







}]);
