IIITKWebsite.controller('NewsController', ['$scope','NewsService','$location', function ($scope,NewsService,$location) {

    $scope.removeBatch = function(parameters){
        var batch = {
            year:parameters.year,
            type:parameters.type,
            branch:parameters.branch
        };
        NewsService.removeBatchDetails(batch)
            .then(function(data){
                $scope.displayBatches();
                console.log("Data for adding Batch Details:" ,data);
            }).catch(function(error){
            console.log("Error: ",error);
        })
    };


}]);
