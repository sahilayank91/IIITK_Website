var newsOperations = require(__BASE__+"modules/database/accessors/news_operations");

var getNews = function(){


    return newsOperations.getNews()
        .then(function(news){
            if(news){
                return news;
            }else{
                console.log("News not available or Some Error occured");
            }
        });
};





module.exports = {



};