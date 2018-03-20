IIITKWebsite.service('CurriculumService',['$http', '$q','UIUtilityService','Upload', function ($http, $q, UIUtilityService,Upload) {

    return {
        addSubject: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};

            var url = UIUtilityService.getURL('curriculum').addSubject;
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
        getSubjectList: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('curriculum').getSubjectList;

            $http({method: 'GET', url: url}).then(function (data) {
                console.log(data);
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
        deleteSubject: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};

            var url = UIUtilityService.getURL('curriculum').deleteSubject;
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

        updateSubject: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};

            var url = UIUtilityService.getURL('curriculum').updateSubject;
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