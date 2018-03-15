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

var getBatch = function (parameters) {
    return batchOperations.getBatchList({current:parameters.current})
        .then(function (data) {
            if(data.length>0) {
                return data;
            }
        }).catch(function(error){
            console.log("Error : ",error);
            reject(error);
        })
};

var addStudent = function (parameters) {
    console.log("Add Student ",parameters);
    return new Promise(function(resolve, reject){
       return batchOperations.getStudentList({year:parameters.year,type:parameters.type,batch:parameters.batch})
           .then(function(data){
               if(data.length>0){
                   var student = data[0].students;
                   for(var i=0,len=parameters.students.length; i<len; i++){
                       student.push(parameters.students[i]);
                   }
                   // student.push(parameters.students);

                   return batchOperations.updateBatch({year:parameters.year,type:parameters.type,batch:parameters.batch},student,false)
                       .then(function(data){
                           if(data){
                               resolve(data);
                           }else{
                               throw new Error("Cant add student to the batch..");
                           }
                       }).catch(function(error){
                           console.log(error);
                       });
               }
           }).catch(function(error){
               console.log(error);
               reject(error);
           })
    });
};

var makeGraduated = function(parameters){
    return new Promise(function(resolve,reject){
       return batchOperations.getBatchList({year:parameters.year,type:parameters.type,batch:parameters.batch})
           .then(function(data){
               if(data.length>0){
                   var current_val = 'Graduated';
                   return batchOperations.updateBatchType({year:parameters.year,type:parameters.type,batch:parameters.batch},current_val,false)
                       .then(function (data) {
                           if(data){
                               resolve(data);
                           }else{
                               throw new Error("Cannot make batch as Graduated.");
                           }
                       }).catch(function(error){
                           console.log(error);
                       })
               }
           }).catch(function(error){
               console.log(error);
               reject(error);
           })
    });
};

var deleteBatch = function(parameters){
    return batchOperations.removeBatchDetails({year:parameters.year,type:parameters.type,batch:parameters.batch})
        .then(function (data) {
            if(data.length>0) {
                return data;
            }
        }).catch(function(error){
            console.log("Error : ",error);
            reject(error);
        })
};

module.exports = {
    addBatch:addBatch,
    addStudent:addStudent,
    getBatch:getBatch,
    makeGraduated:makeGraduated,
    deleteBatch:deleteBatch
};