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
            $scope.markNewsNumber();
            console.log("News data :", data);
        }).catch(function(error){
        console.log("Error: ",error);
    });

    $scope.markNewsNumber = function () {
        $scope.printNews = [];
        // var news = $filter('orderBy')($scope.allnews.data,'create_time');
        var x = $scope.allnews.data;
        var news = x.reverse();
        console.log("News :", news);
        var second,third,tmp_content2,tmp_content3,type2,type3;
        for(var i=0,len=news.length; i<len ; i=i+3){
            second = false;
            third = false;
            $scope.getSubString(news[i].content.text);
            var tmp_content1 = {
                title:news[i].content.title,
                text:$scope.final_string
            };
            if(i+1 < len){
                $scope.getSubString(news[i+1].content.text);
                tmp_content2 = {
                    title:news[i+1].content.title,
                    text:$scope.final_string
                };
                $scope.getIcon(news[i+1].type);
                type2 = $scope.icon;
                second = true;
            }
            if(i+2 < len){
                $scope.getSubString(news[i+2].content.text);
                tmp_content3 = {
                    title:news[i+2].content.title,
                    text:$scope.final_string
                };
                $scope.getIcon(news[i+2].type);
                type3 = $scope.icon;
                third = true;
            }
            $scope.getIcon(news[i].type);
            var temp = {
                content1:tmp_content1,
                type1:$scope.icon,
                content2:tmp_content2,
                type2:type2,
                second:second,
                content3:tmp_content3,
                type3:type3,
                third:third
            };
            $scope.printNews.push(temp);
        }
        $scope.ord_news = [];
        for(var i=0,len=news.length; i<len ; i++){
            $scope.getIcon(news[i].type);
            temp = {
                content:{
                    title:news[i].content.title,
                    text:news[i].content.text
                },
                type:$scope.icon
            };
            $scope.ord_news.push(temp);
        }
        console.log("Index News : ",$scope.printNews);
    };

    $scope.getSubString = function (str) {
          $scope.final_string;
          var len = str.length;
          var max = 130;
          if(len <=max){
              $scope.final_string = str;
          }
          else{
              $scope.final_string = str.substr(0, max) + '...';
          }
    };

    $scope.getIcon = function (news_type) {
        $scope.icon;
        switch(news_type){
            case 'sports': $scope.icon = 'fa fa-soccer-ball-o';
                break;
            case 'cultural': $scope.icon = 'fa fa-music';
                break;
            case 'scholarship': $scope.icon = 'fa fa-key';
                break;
            case 'academics': $scope.icon = 'fa fa-language';
                break;
            case 'admission': $scope.icon = 'fa fa-group';
                break;
            case 'recruitment': $scope.icon = 'fa fa-black-tie';    //fa fa-address-book
                break;
            case 'research': $scope.icon = 'fa fa-cubes';
                break;
            case 'others': $scope.icon = 'fa fa-laptop';
                break;
        }
    };


    $scope.addNewsClicked = function(){
        $scope.addNews_section = true;
        $scope.news_section = false;
        $scope.title="";
        $scope.text ="";
    };

    $scope.goToNewsSection = function () {
        $scope.news_section = true;
        $scope.addNews_section = false;
    };

    $scope.makeNews = function () {
        NewsService.getNews()
            .then(function (data) {
                $scope.allnews = data;
                $scope.markNewsNumber();
                console.log("News data :", data);
            }).catch(function(error){
            console.log("Error: ",error);
        });
    };

    $scope.addNews = function(){
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
