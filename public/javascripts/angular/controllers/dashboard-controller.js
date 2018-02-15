IIITKWebsite.controller('DashboardController', ['$scope','UserService','UIUtilityService', function ($scope,UserService,UIUtilityService) {

    $scope.email = "";
    $scope.password ="";
    $scope.password_repeat = "";
    $scope.firstname="";
    $scope.lastname="";
    $scope.username = "";
    $scope.gender= "";
    $scope.role ="";
    $scope.phone = "";
    UIUtilityService.NOTIFICATION.show({
        title: "Success",
        content: "User Registered Successfully",
        type: "success"
    });



    $scope.validateDetails = function(){
        
    };



    $scope.registerUser = function(){
        $scope.validateDetails();

        var parameters = {
            email:$scope.email,
            password:$scope.password,
            firstname:$scope.firstname,
            lastname:$scope.lastname,
            username:$scope.username,
            gender:$scope.gender,
            phone:$scope.phone,
            role:$scope.role
        };
        UserService.registerAdmin(parameters)
            .then(function(data){
                UIUtilityService.NOTIFICATION.show({
                    title: "Success",
                    content: "User Registered Successfully",
                    type: "success"
                });
            }).catch(function(error){
                console.log("Error: ",error);
        })
    }




}]);
