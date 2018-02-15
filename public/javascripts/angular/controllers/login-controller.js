IIITKWebsite.controller('LoginController', ['$scope','UserService', function ($scope,UserService) {

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
        if($scope.validated==true){
            var parameters = {
                userpass:$scope.password,
                useremail:$scope.email
            };

            UserService.adminLogin(parameters)
                .then(function(data){
                   console.log("Data:" ,data);
                });
        }


    };


}]);
