var express = require('express');
var router = express.Router();
var userOperations = require(__BASE__+"modules/database/accessors/user_operations");
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Indian Institute of Information Technology, Kota' });
});

router.get('/aboutus', function(req, res, next) {
    res.render('partials/aboutus', { title: 'About Us' });
});

router.get('/mission', function(req, res, next) {
    res.render('partials/mission', { title: 'Mission and Vision' });
});

router.get('/generalCouncil', function(req, res, next) {
    res.render('partials/generalcouncil', { title: 'General Council' });
});

router.get('/executiveCouncil', function(req, res, next) {
    res.render('partials/executivecouncil', { title: 'Executive Council' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Admin Login' });
});

router.get('/btech_current', function(req, res, next) {
    res.render('partials/btech_current', { title: 'B.Tech Students | Current' });
});

router.get('/btech_students', function(req, res, next) {
    res.render('partials/btech_students', { title: 'B.Tech Students' });
});

router.get('/btech_graduated', function(req, res, next) {
    res.render('partials/btech_graduated', { title: 'B.Tech Students | Graduated' });
});

router.get('/2017', function(req, res, next) {
    res.render('partials/btech2017', { title: 'B.Tech Students | 2017' });
});

router.get('/2016', function(req, res, next) {
    res.render('partials/btech2016', { title: 'B.Tech Students | 2016' });
});

router.get('/2015', function(req, res, next) {
    res.render('partials/btech2015', { title: 'B.Tech Students | 2015' });
});

router.get('/2014', function(req, res, next) {
    res.render('partials/btech2014', { title: 'B.Tech Students | 2014' });
});

router.get('/2013', function(req, res, next) {
    res.render('partials/btech2013', { title: 'B.Tech Students | Graduated | 2013' });
});

router.get('/faculty', function(req, res, next) {
    res.render('partials/faculty', { title: 'Faculty' });
});

router.get('/adjunctfaculty', function(req, res, next) {
    res.render('partials/adjunctfaculty', { title: 'Adjunct Faculty' });
});

router.get('/visitingfaculty', function(req, res, next) {
    res.render('partials/visitingfaculty', { title: 'Visiting Faculty' });
});

router.get('/computerlab', function(req, res, next) {
    res.render('partials/computerlab', { title: 'Computer Labs' });
});

router.get('/admin',function(req,res,next){
    res.render('partials/admin',{title: "Admin"});
});

router.get('/department', function(req, res, next) {
    res.render('partials/department', { title: 'Departments' });
});

router.get('/courses', function(req, res, next) {
    res.render('partials/courses', { title: 'Institute Courses ' });
});

router.get('/fee', function(req, res, next) {
    res.render('partials/fee', { title: 'Fees & Registration ' });
});


router.get('/createPost',function(req,res,next){
    res.render('partials/createpost',{title: "Create Post"});
});




router.post('/register',function(req,res){
    var promise = Promise.resolve(true);
    console.log("request: ",req);
    var parameters = {
        userEmail: req.body.email,
        userPass: req.body.password,
        userName: req.body.username,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        userPhone: req.body.phone,
        gender: req.body.gender,
        role: req.body.role
    };

    console.log("Parameters:",parameters);

    promise = userOperations.createUser(parameters);

    promise.then(function(data) {
        if (data) {
            console.log("Data generated after creating the user: ", data);
            res.render('index', {userdata: data});
        } else {
            console.log("Some error occured during registration, Please Try Again");
        }
    })
});




















router.get('/paymentprocess', function(req, res, next) {
    res.render('partials/paymentprocess', { title: 'Fees | Payment Process' });
});

module.exports = router;
