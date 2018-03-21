var express = require('express');
var router = express.Router();
var curriculumOperations = require(__BASE__+"modules/database/accessors/curriculum_operations");
var path = require('path');
var CurriculumController = require(__BASE__+"modules/controller/CurriculumController");
var RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
const fileUpload = require('express-fileupload');

router.use(fileUpload());

router.get('/getSubjectList',function(req,res,next){

    CurriculumController.getSubjectList()
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success:true,data: data});
            } else {
                console.log("Some error occured while getting data from the database");
            }
        });
});

router.post('/addSubject',function(req,res,next) {
    var parameters = {
        branch: req.body.branch,
        semester:req.body.semester,
        credits:req.body.credits,
        subject:req.body.subject
    };
    console.log(parameters);
    CurriculumController.addSubject(parameters)
        .then(function (data) {
            if (data) {
                console.log("Data:", data);
                RESPONSE.sendOkay(res, {success: true,data:data});
            } else {
                console.log("Some error occured while getting data from the database");
            }
        }).then(function (data) {
    //     if (!req.files)
    //         return res.status(400).send('No files were uploaded.');
    //
    //     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    //     var sampleFile = req.files.file;
    //
    //     // Use the mv() method to place the file somewhere on your server
    //     sampleFile.mv('/uploads/filename.jpg', function (err) {
    //         if (err)
    //             return res.status(500).send(err);
    //
    //         res.send('File uploaded!');
    //
    //
    //     })
    //
     });

});


router.post('/updateSubject', function (req, res, next) {
      var parameters = {
        id: req.body.id,
        branch: req.body.branch,
        semester:req.body.semester,
        credits:req.body.credits,
        subject:req.body.subject

    };
      CurriculumController.updateSubject(parameters)
        .then(function (Data) {
            if (Data) {
                console.log("Data from update Curriculum:", Data);
                RESPONSE.sendOkay(res, {success: true,data:Data});
            } else {
                console.log("Some error occured while updating data in the database");
            }
        });
});


router.post('/deleteSubject', function (req, res, next) {
    var promise;
    var id = req.body.id;
   CurriculumController.deleteSubject(id)
        .then(function (data) {
            RESPONSE.sendOkay(res, {success: true, redirect: path.join('/' + "curriculum")});
        }).catch(function (error) {
             console.log(error);
    });


});


module.exports = router;
