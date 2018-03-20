IIITKWebsite.service('BatchService',['$http', '$q','UIUtilityService', function ($http, $q, UIUtilityService) {

    return {

        addBatchDetails: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            console.log(parameters);
            var url = UIUtilityService.getURL('batch').addBatch;
            $http({method: 'POST', url: url, data: parameters})
                .then(function (data) {
                         data = data.data;
                        if (data.success == 'false' || !data.success) {
                            deferredData.success = false;
                        } else {
                            deferredData.success = true;
                            deferredData.data = data.data;
                        }
                        deferredData.message = data.message;
                        deferred.resolve(deferredData);

                    }, function(result) {
                        //some error
                        deferredData.success = false;
                        deferred.resolve(deferredData);
                    });
                return deferred.promise;
        },
        addStudentDetails: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            console.log(parameters);
            var url = UIUtilityService.getURL('batch').updateBatch;
            $http({method: 'POST', url: url, data: parameters}).then(function (data) {
                data = data.data;
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferredData.message = data.message;
                deferred.resolve(deferredData);

            }, function(result) {
                //some error
                deferredData.success = false;
                deferred.resolve(deferredData);
            });
            return deferred.promise;
        },

        getAllBatches: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('batch').getBatchList;
            $http({method: 'POST', url: url, data:parameters}).then(function (data) {
                data = data.data;
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    console.log("dfsdfsadf");
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferredData.message = data.message;
                deferred.resolve(deferredData);

            }, function(result) {
                //some error
                deferredData.success = false;
                deferred.resolve(deferredData);
            });
            return deferred.promise;
        },

        updateBatchDetails: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            console.log(parameters);
            var url = UIUtilityService.getURL('batch').updateBatchType;
            $http({method: 'POST', url: url, data: parameters}).then(function (data) {
                data = data.data;
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferredData.message = data.message;
                deferred.resolve(deferredData);

            }, function(result) {
                //some error
                deferredData.success = false;
                deferred.resolve(deferredData);
            });
            return deferred.promise;
        },

        removeBatchDetails: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            console.log(parameters);
            var url = UIUtilityService.getURL('batch').deleteBatch;
            $http({method: 'POST', url: url, data: parameters}).then(function (data) {
                data = data.data;
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferredData.message = data.message;
                deferred.resolve(deferredData);

            }, function(result) {
                //some error
                deferredData.success = false;
                deferred.resolve(deferredData);
            });
            return deferred.promise;
        }

    }

}]);