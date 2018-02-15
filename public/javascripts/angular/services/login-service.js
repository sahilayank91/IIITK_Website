IIITKWebsite.service('LoginService',['$http', '$q','UIUtilityService', function ($http, $q, UIUtilityService) {

    return {

        adminLogin: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};

            var url = UIUtilityService.getURL('authenticate').login;
            console.log(url);
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