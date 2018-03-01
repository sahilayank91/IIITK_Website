IIITKWebsite.service('BatchService',['$http', '$q','UIUtilityService', function ($http, $q, UIUtilityService) {

    return {

        addBatchDetails: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            console.log(parameters);
            var url = UIUtilityService.getURL('batch').addBatch;
            $http({method: 'POST', url: url, data: parameters}).success(function (data, status, headers, config) {
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferredData.message = data.message;
                deferred.resolve(deferredData);
            })
                .error(function (data, status, headers, config) {
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
            $http({method: 'POST', url: url, data: parameters}).success(function (data, status, headers, config) {
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferredData.message = data.message;
                deferred.resolve(deferredData);
            })
                .error(function (data, status, headers, config) {
                    deferredData.success = false;
                    deferred.resolve(deferredData);
                });
            return deferred.promise;
        },

        getAllBatches: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('batch').getBatchList;
            $http({method: 'POST', url: url, data:parameters}).success(function (data,status,headers,config){
                if(data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferredData.message = data.message;
                deferred.resolve(deferredData);
            })
                .error(function (data,status,headers,config) {
                    deferredData.success = false;
                    deferred.resolve(deferredData);
                });
            return deferred.promise;
        }

    }

}]);