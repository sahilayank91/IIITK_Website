IIITKWebsite.controller('DashboardController', ['$scope','UserService','UIUtilityService','$mdSidenav','$log', function ($scope,UserService,UIUtilityService,$mdSidenav,$log) {

    console.log("Inside Dashboard Controller");
    $scope.email = "";
    $scope.password ="";
    $scope.password_repeat = "";
    $scope.firstname="";
    $scope.lastname="";
    $scope.username = "";
    $scope.gender= "";
    $scope.role ="";
    $scope.phone = "";
    $scope.showHints = true;
    UIUtilityService.NOTIFICATION.show({
        title: "Success",
        content: "User Registered Successfully",
        type: "success"
    });



    $scope.validateDetails = function(){
        
    };

    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }

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
