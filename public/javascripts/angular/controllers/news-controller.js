IIITKWebsite.controller('NewsController', ['$scope','NewsService','$location', function ($scope,NewsService,$location) {
    $scope.title;
    $scope.text;
    $scope.type ;
    $scope.news_section = true;
    $scope.addNews_section = false;
    console.log("Inside News Controller");
    $scope.type_options = ["sports","cultural","scholarship","academics","admission","recruitment","research","others"];

    $scope.allnews = {};
    NewsService.getNews()
        .then(function (data) {
            $scope.allnews = data;
            console.log("News data :", data);
        }).catch(function(error){
        console.log("Error: ",error);
    });

    $scope.addNewsClicked = function(){
        $scope.addNews_section = true;
        $scope.news_section = false;
    };

    $scope.goToNewsSection = function () {
        $scope.news_section = true;
        $scope.addNews_section = false;
    };

    $scope.makeNews = function () {
        NewsService.getNews()
            .then(function (data) {
                $scope.allnews = data;
                console.log("News data :", data);
            }).catch(function(error){
            console.log("Error: ",error);
        });
    };

    $scope.addNews = function(){
       console.log("INside ad ");
        console.log("title",$scope.title);
        console.log("text",$scope.text);

        var content = {
            title:$scope.title,
            text:$scope.text
        };

        var posted_by = "rky186GDz";

        var parameters = {
            type:$scope.type,
            posted_by:posted_by,
            content:content
        };
        NewsService.addNews(parameters)
            .then(function(data){
                $scope.makeNews();
                $scope.goToNewsSection();
                console.log("Data for adding News:" ,data);
            }).catch(function(error){
            console.log("Error: ",error);
        })
    };

    $scope.removeNews = function(parameters){
        var news = {
            _id:parameters._id,
            type:parameters.type
        };
        NewsService.deleteNews(news)
            .then(function(data){
                $scope.makeNews();
                console.log("Data for Removing News :" ,data);
            }).catch(function(error){
            console.log("Error: ",error);
        })
    };


}]);
