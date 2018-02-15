var newsOperations = require(__BASE__+"modules/database/accessors/news_operations");

var getNews = function(parameters){
    return newsOperations.getNews(parameters)
        .then(function(news){
            if(news){
                return news;
            }else{
                console.log("News not available or Some Error occured");
            }
        });
};

var addNews = function(parameters){
    return newsOperations.createNews(parameters)
        .then(function(data){
            if(data){
                return data;
            }else {
                console.log("Failed to add News");
            }
        }).catch(function(error){
            console.log("Failed to Add News:",error);
        });
};

var updateNews = function(parameters){
    return newsOperations.updateNews(parameters)
        .then(function(data){
            if(data){
                return data;
            }else {
                console.log("Failed to update News");
            }
        }).catch(function(error){
            console.log("Failed to udpate News:",error);
        });
};

var deleteNews = function(parameters){
    return newsOperations.deleteNews(parameters)
        .then(function(data){
            if(data){
                return data;
            }else {
                console.log("Failed to delete News");
            }
        }).catch(function(error){
            console.log("Failed to delete News:",error);
        });
};

module.exports = {
    getNews:getNews,
    addNews:addNews,
    updateNews:updateNews,
    deleteNews:deleteNews

};