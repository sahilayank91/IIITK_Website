IIITKWebsite.controller('DashboardController', ['$scope','UserService', function ($scope,UserService) {

    $scope.email = "";
    $scope.password ="";
    $scope.password_repeat = "";
    $scope.firstname="";
    $scope.lastname="";
    $scope.username = "";
    $scope.gender= "";
    $scope.role ="";
    $scope.phone = "";




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
                console.log("Data for RegisterAdmin:" ,data);
            }).catch(function(error){
                console.log("Error: ",error);
        })
    }




}]);
