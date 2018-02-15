IIITKWebsite.service('EventService',['$http', '$q','UIUtilityService', function ($http, $q, UIUtilityService) {

    return {
        getEvent: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('event').getEvent;
            url += "?n=5";
            $http({method: 'GET', url: url}).success(function (data, status, headers, config) {
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferred.resolve(deferredData);
            })
                .error(function (data, status, headers, config) {
                    deferredData.success = false;
                    deferred.resolve(deferredData);
                });
            return deferred.promise;
        },

        addEvent: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};

            var url = UIUtilityService.getURL('event').addEvent;
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

        updateEvent: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};

            var url = UIUtilityService.getURL('news').updateEvent;
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
        deleteEvent: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};

            var url = UIUtilityService.getURL('news').deleteEvent;
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
    }



}]);