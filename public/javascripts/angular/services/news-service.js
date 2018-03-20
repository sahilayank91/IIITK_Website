IIITKWebsite.service('NewsService',['$http', '$q','UIUtilityService', function ($http, $q, UIUtilityService) {

    return {
        getNews: function () {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('news').getNews;
            $http({method: 'POST', url: url}).then(function (data) {
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
        addNews: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};

            var url = UIUtilityService.getURL('news').addNews;
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

        updateNews: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};

            var url = UIUtilityService.getURL('news').updateNews;
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
        deleteNews: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};

            var url = UIUtilityService.getURL('news').deleteNews;
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
    }



}]);