var facultyOperations = require(__BASE__+"modules/database/accessors/faculty_operations");

var getFacultyList = function(){
    return facultyOperations.getFacultyList()
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No Faculty exists with given useremail');
            }
        }).catch(function(error){
            console.log("Error in get Faculty: ",error);
        });
};


var registerFaculty = function(parameters){
    return facultyOperations.createFaculty(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant create user with the given credentials');
            }
        }).catch(function(err){
            console.log("Error in createUser",error);
        })
};
var deleteFaculty = function(parameters){
    console.log("Inside delete Faculty: ",parameters);
    return facultyOperations.deleteFaculty({_id:parameters})
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant create user with the given credentials');
            }
        }).catch(function(err){
            console.log("Error in createUser",error);
        })
};

var updateFaculty = function(parameters){
    console.log("Inside delete Faculty: ",parameters);
    return facultyOperations.updateFaculty({_id:parameters.id},parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant update user with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in udpateUser",error);
        })
};

module.exports = {
    registerFaculty:registerFaculty,
    getFacultyList:getFacultyList,
    deleteFaculty:deleteFaculty,
    updateFaculty:updateFaculty
};