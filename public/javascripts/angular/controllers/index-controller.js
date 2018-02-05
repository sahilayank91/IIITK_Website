IIITKWebsite.controller('IndexController', ['$scope', '$state', '$window', '$rootScope', '$timeout', 'UIUtilityService', 'GroupService', 'ChildService', 'NotificationService', 'InstituteService', 'FollowClassService', 'PostsService', 'FeatureService','ProfileService', '$q', function ($scope, $state, $window, $rootScope, $timeout, UIUtilityService, GroupService, ChildService, NotificationService, InstituteService, FollowClassService, PostsService, FeatureService,ProfileService, $q) {


    $scope.$on('$stateChangeSuccess', function () {

       console.log("Inside index controlle");

    });
}]);
