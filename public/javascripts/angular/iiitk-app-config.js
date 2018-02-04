IIITKWebsite.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function ($httpProvider, $stateProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push('IIITKInterceptor');
    
    // For any unmatched url, redirect to /index
    $urlRouterProvider.otherwise("/index");
    $urlRouterProvider.when("/", "/index");

    // Now set up the states
    $stateProvider
        .state('index', {

            url: "/index",
            templateUrl: "partials/index",
            controller: "DashboardController"
        })
        .state('profile', {
            url: "/profile",
            templateUrl: "partials/profile",
            controller: "ProfileController"
        })
        .state('user', {
            url: "/user/:id",
            templateUrl: "partials/others-profile",
            params: {
                id: null
            },
            controller: "OthersProfileController"
        })

    
}]);
