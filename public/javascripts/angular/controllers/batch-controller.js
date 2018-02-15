IIITKWebsite.controller('BatchController', ['$scope','BatchService', function ($scope,BatchService) {

    console.log("Inside Batch Controller");
    $scope.year_options = ["First","Second","Third","Forth"];
    $scope.type_options = ["BTech", "MTech"];

    $scope.year = "";
    $scope.type = "";
    $scope.branch = "";
    $scope.name1 = "";
    $scope.id1 = "";


    $scope.addBatch = function(){

        var students = [{
          name:$scope.name1,
          college_id:$scope.id1
        }];

        var parameters = {
            year:$scope.year,
            type:$scope.type,
            branch:$scope.branch,
            students:students
        };
        BatchService.addBatchDetails(parameters)
            .then(function(data){
                console.log("Data for adding Batch Details:" ,data);
            }).catch(function(error){
            console.log("Error: ",error);
        })
    }


}]);
