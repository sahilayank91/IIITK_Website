IIITKWebsite.controller('BatchController', ['$scope','BatchService', function ($scope,BatchService) {

    console.log("Inside Batch Controller");
    $scope.year_options = ["First","Second","Third","Forth"];
    $scope.type_options = ["BTech", "MTech"];

    $scope.allbatches = true;
    $scope.addbatch = false;
    $scope.addstudent = false;

    $scope.year = "";
    $scope.type = "";
    $scope.branch = "";
    $scope.name1 = "";
    $scope.id1 = "";


        $scope.curr_batches = {};
        var values = {current:'Current'};
        BatchService.getAllBatches(values)
            .then(function (data) {
                $scope.curr_batches = data;
                console.log("curr_batches data :", data);
            }).catch(function(error){
            console.log("Error: ",error);
        });


    $scope.addBatchClicked = function(){
        $scope.allbatches =  false;
        $scope.addbatch = true;
        // window.location = "/createBatch";
    };

    $scope.goToAllBatches = function(){
        $scope.allbatches = true;
        $scope.addbatch = false;
        $scope.addstudent = false;
    };

    $scope.addStudentClicked = function () {
        $scope.allbatches = false;
        $scope.addstudent = true;
    };

    $scope.addNewBatch = function(){
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
                $scope.goToAllBatches();
                console.log("Data for adding Batch Details:" ,data);
            }).catch(function(error){
                $scope.addBatchClicked();
                console.log("Error: ",error);
        })
    };


    $scope.addStudentToBatch = function () {
        var students = {
            name:$scope.name,
            college_id:$scope.id
        };
        var parameters = {
            year:'Fourth',
            type:'BTech',
            branch:'cse',
            students:students
        };
        BatchService.addStudentDetails(parameters)
            .then(function (data) {
                $scope.goToAllBatches();
                // $scope.goToAllBatches();
                console.log("Data for adding a student to batch: ",data);
            }).catch(function (error) {
                $scope.addStudentClicked();
                console.log("Error: ",error);
        })
    };

}]);
