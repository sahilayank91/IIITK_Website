IIITKWebsite.controller('LoginController', ['$scope','UserService','UIUtilityService', function ($scope,UserService,UIUtilityService) {

    console.log("Inside Login Controller");
    $scope.validated = true;

    $scope.email = "";
    $scope.password = "";


    $scope.validateParameters =function(){
        //TODO create validation here

    };

    $scope.loginAdmin = function(){
        console.log("Inside login Admin");
        $scope.validateParameters();
        if($scope.validated === true){
            var parameters = {
                userpass:$scope.password,
                useremail:$scope.email
            };

            console.log(parameters);
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
