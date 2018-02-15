IIITKWebsite.service('UIUtilityService', ['$window', function ($window) {
    'use strict';
    
    return {

        getURL: function (key) {
            console.log("Key: ",key);
            return $window.CONFIG[key + 'URL'];
        }

    };
}]);
