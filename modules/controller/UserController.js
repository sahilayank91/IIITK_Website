var userOperations = require(__BASE__+"modules/database/accessors/user_operations");

var getUsers = function(paramters){
    return userOperations.getUsers({email: paramters.useremail, password: parameters.userpass}, {_id:1,firstname:1, lastname:1, email: 1,phone:1 ,profile_pic:1})
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No User exists with given useremail');
            }
        }).catch(function(error){
           console.log("Error in get Users: ",error);
        });

};


module.exports = {
  getUsers:getUsers,
};