var batchOperations = require(__BASE__+"modules/database/accessors/batch_operations");

var addBatch = function(parameters){
    console.log("Add Batch ",parameters);
    return batchOperations.addStudentList(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant add batch with given information');
            }
        }).catch(function(error){
            console.log("Error in addStudentList",error);
        })
};

module.exports = {
    addBatch:addBatch
};