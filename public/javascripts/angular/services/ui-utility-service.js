IIITKWebsite.service('UIUtilityService', ['$window', function ($window) {
    'use strict';
    
    return {
        getURL: function (key) {
            return $window.CONFIG[key + 'URL'];
        },
        NOTIFICATION: $window.UTILITIES.NOTIFICATIONS,

    };
}]);
