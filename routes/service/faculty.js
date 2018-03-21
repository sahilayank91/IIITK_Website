var express = require('express');
var router = express.Router();
var newsOperations = require(__BASE__+"modules/database/accessors/news_operations");
var path = require('path');
var NewsController = require(__BASE__+"modules/controller/NewsController");
var FacultyController = require(__BASE__+"modules/controller/FacultyController");
var UserController = require(__BASE__+"modules/controller/UserController");
var RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
const fileUpload = require('express-fileupload');

router.use(fileUpload());

router.get('/getFacultyList',function(req,res,next){

    FacultyController.getFacultyList()
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success:true,data: data});
                return true;
            } else {
                console.log("Some error occured while getting data from the database");
            }
        });
});

router.post('/addFaculty',function(req,res,next) {
    var promise;
    var parameters = {
        email: req.body.email,
        branch: req.body.branch,
        education: req.body.education,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        gender: req.body.gender,
        role: req.body.role,
        type: req.body.type,
        post:req.body.post,
        about: req.body.about
    };
    FacultyController.registerFaculty(parameters)
        .then(function (data) {
            if (data) {
                console.log("Data:", data);
                RESPONSE.sendOkay(res, {success: true});
                // RESPONSE.sendOkay(res, parameters);
                return true;
            } else {
                console.log("Some error occured while getting data from the database");
            }
        // }).then(function (data) {
        //
        //
        // if (!req.files)
        //     return res.status(400).send('No files were uploaded.');
        //
        // // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        // let sampleFile = req.files.file;
        //
        // // Use the mv() method to place the file somewhere on your server
        // sampleFile.mv('/uploads/filename.jpg', function (err) {
        //     if (err)
        //         return res.status(500).send(err);
        //
        //     res.send('File uploaded!');
        //

        })

});
    router.post('/updateFaculty', function (req, res, next) {
        var parameters = {
            id: req.body.id,
            email: req.body.email,
            branch: req.body.branch,
            education: req.body.education,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            post:req.body.post,
            about: req.body.about
        };
        FacultyController.updateFaculty(parameters)
            .then(function (Data) {
                if (Data) {
                    console.log("Data from update Faculty:", Data);
                    RESPONSE.sendOkay(res, {success: true});
                } else {
                    console.log("Some error occured while updating data in the database");
                }
            });


    });


    router.post('/deleteFaculty', function (req, res, next) {
        var promise;
        var id = req.body.id;
        FacultyController.deleteFaculty(id)
            .then(function (data) {
                RESPONSE.sendOkay(res, {success: true, redirect: path.join('/' + "faculty_dashboard")});
                return true;
            }).catch(function (error) {
            console.log(error);
        });

        promise.then(function (data) {
            // res.render('/index',{data:data});
        });
    });


    router.post("/uploadProfilePic", function (req, res) {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.file;

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('/uploads/filename.jpg', function (err) {
                if (err)
                    return res.status(500).send(err);

                res.send('File uploaded!');

            }
        )
    })


    module.exports = router;
