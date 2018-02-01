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
module.exports = router;
