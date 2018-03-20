IIITKWebsite.service('FacultyService',['$http', '$q','UIUtilityService','Upload', function ($http, $q, UIUtilityService,Upload) {

    return {

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
        getFacultyList: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('faculty').getFacultyList;

            $http({method: 'GET', url: url}).then(function (data) {
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
        deleteFaculty: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};

            var url = UIUtilityService.getURL('faculty').deleteFaculty;
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

        updateFaculty: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};

            var url = UIUtilityService.getURL('faculty').updateFaculty;
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
        uploadProfilePic:function(file){

        }


    }



}]);