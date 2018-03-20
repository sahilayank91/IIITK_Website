var curriculumOperations = require(__BASE__+"modules/database/accessors/curriculum_operations");

var getSubjectList = function(){
    return curriculumOperations.getSubjectList()
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No Subject exists with given data');
            }
        }).catch(function(error){
            console.log("Error in get Subject: ",error);
        });
};


var addSubject = function(parameters){
    return curriculumOperations.addSubject(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant create subject with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in addSubject",error);
        })
};
var deleteSubject = function(parameters){
    console.log("Inside delete Subject: ",parameters);
    return curriculumOperations.deleteSubject({_id:parameters})
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant delete subject with the given credentials');
            }
        }).catch(function(err){
            console.log("Error in deleteSubject",error);
        })
};

var updateSubject = function(parameters){
    console.log("Inside update Subject: ",parameters);
    return curriculumOperations.updateFaculty({_id:parameters.id},parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant update subject with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in udpateSubject",error);
        })
};

module.exports = {
    addSubject:addSubject,
    getSubjectList:getSubjectList,
    deleteSubject:deleteSubject,
    updateSubject:updateSubject
};