IIITKWebsite.service('UserService',['$http', '$q','UIUtilityService', function ($http, $q, UIUtilityService) {

    return {

        adminLogin: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};

            var url = UIUtilityService.getURL('authenticate').login;
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


        registerAdmin: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};

            var url = UIUtilityService.getURL('authenticate').register;
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
        registerFaculty: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};

            var url = UIUtilityService.getURL('faculty').addFaculty;
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