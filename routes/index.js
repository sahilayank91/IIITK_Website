var express = require('express');
var router = express.Router();

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

router.get('/department', function(req, res, next) {
    res.render('partials/department', { title: 'Departments' });
});

router.get('/courses', function(req, res, next) {
    res.render('partials/courses', { title: 'Institute Courses ' });
});

router.get('/fee', function(req, res, next) {
    res.render('partials/fee', { title: 'Fees & Registration ' });
});
module.exports = router;
