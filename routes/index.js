var express = require('express');
var router = express.Router();
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

router.get('/governingbody', function(req, res, next) {
    res.render('partials/governingbody', { title: 'Governing Body' });
});

router.get('/executiveCouncil', function(req, res, next) {
    res.render('partials/executivecouncil', { title: 'Executive Council' });
});

router.get('/senate', function(req, res, next) {
    res.render('partials/senate', { title: 'Senate' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Admin Login' });
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

router.get('/hostelsite', function(req, res, next) {
    res.render('partials/hostelsite', { title: "Hostel's Site" });
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
    res.render('admin_dashboard/admin',{title: "Admin"});
});

router.get('/department', function(req, res, next) {
    res.render('partials/department', { title: 'Departments' });
});

router.get('/courses', function(req, res, next) {
    res.render('partials/courses', { title: 'Institute Courses ' });
});

router.get('/campus', function(req, res, next) {
    res.render('partials/campus', { title: 'Overall Campus' });
});

router.get('/clubs', function(req, res, next) {
    res.render('partials/clubs', { title: 'Student Clubs' });
});

router.get('/discipline', function(req, res, next) {
    res.render('partials/discipline', { title: 'Discipline & Grievance' });
});

router.get('/fee', function(req, res, next) {
    res.render('partials/fee', { title: 'Fees & Registration ' });
});

router.get('/library', function(req, res, next) {
    res.render('partials/library', { title: 'Library' });
});

router.get('/dining', function(req, res, next) {
    res.render('partials/dining', { title: 'Dining Services' });
});

router.get('/infrastructure', function(req, res, next) {
    res.render('partials/infrastructure', { title: 'IT Infrastructure' });
});

router.get('/abouthostel', function(req, res, next) {
    res.render('partials/abouthostel', { title: 'About Hostel' });
});

router.get('/hostelpolicy', function(req, res, next) {
    res.render('partials/hostelpolicy', { title: 'Hostel Policies' });
});

router.get('/events', function(req, res, next) {
    res.render('partials/events', { title: 'Institute Events ' });
});

router.get('/sports', function(req, res, next) {
    res.render('partials/sports', { title: 'Sports & Recreation' });
});

router.get('/medical', function(req, res, next) {
    res.render('partials/medical', { title: 'Medical Facilities' });
});


router.get('/administration', function(req, res, next) {
    res.render('partials/administration', { title: 'Administration' });
});

router.get('/createPost',function(req,res,next){
    res.render('partials/createpost',{title: "Create Post"});
});

router.get('/allBatches', function (req,res,next) {
    res.render('admin_dashboard/allBatches',{title: "All Batches"});
});

router.get('/faculty_dashboard', function (req,res,next) {
    res.render('admin_dashboard/faculty_management_dashboard',{title: "All Batches"});
});

router.get('/curriculum',function(req,res,next){
    res.render('admin_dashboard/curriculum',{title: "Curriculum"});
});


router.get('/paymentprocess', function(req, res, next) {
    res.render('partials/paymentprocess', { title: 'Fees | Payment Process' });
});

router.get('/news',function(req,res,next){
    res.render('admin_dashboard/news',{title: "News"});
});

router.get('/latestNews',function(req,res,next){
    res.render('partials/latestnews',{title: "Latest News"});
});

router.get('/gallery',function (req,res,next) {
   res.render('partials/gallery',{title: "IIITK Photo Gallery"});
});


router.get('/social_platforms',function (req,res,next) {
    res.render('admin_dashboard/social_platforms',{title: "IIITK Social Platforms"});
});



router.get('/event_dashboard',function (req,res,next) {
    res.render('admin_dashboard/createEvent',{title: "IIITK Social Platforms"});
});
router.get('/curriculumPortal',function (req,res,next) {
    res.render('partials/curriculum',{title: "IIITK Social Platforms"});
});


module.exports = router;
