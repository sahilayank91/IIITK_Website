IIITKWebsite.controller('SocialPlatformController', ['$scope','$location','$window', function ($scope,$location,$window) {


    $scope.RedirectToURL = function(url) {
        var host = $window.location.host;
        var landingUrl = url;
        $window.location.href = landingUrl;
    };

}]);
