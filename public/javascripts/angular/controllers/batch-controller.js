IIITKWebsite.controller('BatchController', ['$scope','BatchService','$location', function ($scope,BatchService,$location) {

    console.log("Inside Batch Controller");
    $scope.year_options = ["First","Second","Third","Forth"];
    $scope.type_options = ["BTech", "MTech"];
    $scope.branch_options = ['cse','ece'];

    $scope.allbatches = true;
    $scope.addbatch = false;
    $scope.addstudent = false;

    $scope.year = "";
    $scope.type = "";
    $scope.branch = "";
    $scope.name1 = "";
    $scope.id1 = "";
    $scope.s_name = "";
    $scope.s_id = "";

    // $scope.displayBatches();
    $scope.curr_batches = {};
    var values = {current:'Current'};
    BatchService.getAllBatches(values)
        .then(function (data) {
            $scope.curr_batches = data;
            console.log("curr_batches data :", data);
        }).catch(function(error){
        console.log("Error: ",error);
    });
    $scope.grad_batches = {};
    var values = {current:'Graduated'};
    BatchService.getAllBatches(values)
        .then(function (data) {
            $scope.grad_batches = data;
            console.log("curr_batches data :", data);
        }).catch(function(error){
        console.log("Error: ",error);
    });

    $scope.displayBatches = function(){
        var values = {current:'Current'};
        BatchService.getAllBatches(values)
            .then(function (data) {
                $scope.curr_batches = data;
                console.log("curr_batches data :", data);
            }).catch(function(error){
            console.log("Error: ",error);
        });
        var values = {current:'Graduated'};
        BatchService.getAllBatches(values)
            .then(function (data) {
                $scope.grad_batches = data;
                console.log("curr_batches data :", data);
            }).catch(function(error){
            console.log("Error: ",error);
        });
    };

    $scope.makeBatchArray = function(parameters){
        $scope.student_details = {
            year:parameters.year,
            branch:parameters.branch,
            type:parameters.type
        };
        $scope.student_array = parameters.students;
        console.log("Make Batch Array :", parameters);
    };

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

    $scope.addStudentClicked = function (parameters) {
        $scope.allbatches = false;
        $scope.addstudent = true;
        $scope.batch_details = {
            year:parameters.year,
            type:parameters.type,
            branch:parameters.branch
        };
    };

    $scope.addNewBatch = function(){
        var values = {
          name:$scope.s_name,
          college_id:$scope.s_id
        };

        $scope.students.push(values);

        var parameters = {
            year:$scope.year,
            type:$scope.type,
            branch:$scope.branch,
            students:$scope.students
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

    $scope.students = [];
    $scope.addStudentRow = function () {
        $scope.students.push({});
    };

    $scope.removeStudentRow = function (index) {
        $scope.students.splice(index, 1);
    };

    $scope.addStudentToBatch = function (details) {
        var values = {
            name:$scope.s_name,
            college_id:$scope.s_id
        };

        $scope.students.push(values);
        var parameters = {
            year:details.year,
            type:details.type,
            branch:details.branch,
            students:$scope.students
        };
        console.log("Controller Parameters :",parameters);
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

    $scope.updateBatchClicked = function(parameters) {
        $scope.batch_details = {
            year:parameters.year,
            type:parameters.type,
            branch:parameters.branch
        };
        // $scope.updateBatchToGraduated(parameters);
    };

    $scope.updateBatchToGraduated = function(parameters) {
        var batch = {
             year:parameters.year,
             type:parameters.type,
             branch:parameters.branch
        };
        BatchService.updateBatchDetails(batch)
            .then(function (data) {
                $scope.displayBatches();
            }) .catch(function(error){
                console.log("Error :",error);
        })
    };

    $scope.removeBatchClicked = function(parameters){
        $scope.batch_details = {
            year:parameters.year,
            type:parameters.type,
            branch:parameters.branch
        };
        // $scope.removeBatch(parameters);
    };

    $scope.removeBatch = function(parameters){
        var batch = {
            year:parameters.year,
            type:parameters.type,
            branch:parameters.branch
        };
        BatchService.removeBatchDetails(batch)
            .then(function(data){
                $scope.displayBatches();
                console.log("Data for adding Batch Details:" ,data);
            }).catch(function(error){
                console.log("Error: ",error);
        })
    };


}]);
