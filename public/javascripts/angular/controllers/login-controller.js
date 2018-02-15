IIITKWebsite.controller('LoginController', ['$scope','UserService','UIUtilityService', function ($scope,UserService,UIUtilityService) {

    $scope.validated = true;
    $scope.email = "";
    $scope.password = "";


    $scope.validateParameters =function(){
        //TODO create validation here

    };

    $scope.loginAdmin = function(){
        console.log("Inside login Admin");
        $scope.validateParameters();
        if($scope.validated==true){
            var parameters = {
                userpass:$scope.password,
                useremail:$scope.email
            };

            UserService.adminLogin(parameters)
                .then(function(data){
                    UIUtilityService.NOTIFICATION.show({
                        title: "Success",
                        content: "User added to fee Successfully.",
                        type: "success"
                    });
                });
        }






    };














}]);
