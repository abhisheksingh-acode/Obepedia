const express = require('express');
const router = express.Router();

// Login Module 
const {Login} = require('./Login/auth')

router.post('/login' , Login)

// Institute Details 
const {InstiDetails , getInstiUsers} = require('./InstiDetails/index');

router.post('/instidetails/:id' , InstiDetails);
router.get('/getinstiusers' , getInstiUsers);

// Profile Module
const {postProfile, getProfile , delProfile} = require('./Profile/index')

router.post('/profile/postprofile' , postProfile)
router.get('/profile/getprofile' , getProfile)
router.delete('/profile/delprofile/:id' , delProfile)


// faculty Module
const {postfaculty, getfaculty , delfaculty} = require('./Faculty/index')

router.post('/faculty/postfaculty' , postfaculty)
router.get('/faculty/getfaculty' , getfaculty)
router.delete('/faculty/delfaculty/:id' , delfaculty)


// Vacancy Module
const {postVacancy, getVacancy ,delVacancy} = require('./Vacancy/index')

router.post('/vacancy/postvacancy' , postVacancy)
router.get('/vacancy/getvacancy' , getVacancy)
router.delete('/vacancy/delvacancy/:id' , delVacancy)


// Course Module
const {postCourse, getCourse ,delCourse} = require('./Course/index')

router.post('/course/postcourse' , postCourse)
router.get('/course/getcourse' , getCourse)
router.delete('/course/delcourse/:id' , delCourse)


// Gallary Module
const {postGallary, getGallary ,delGallary} = require('./Gallary/index')

router.post('/gallary/postgallary' , postGallary)
router.get('/gallary/getgallary' , getGallary)
router.delete('/gallary/delgallary/:id' , delGallary)


// Review Module
const {getReview ,delReview , getAllReviews} = require('./Reviews/index')

router.get('/reviews/getreview' , getReview)
router.delete('/reviews/delreview/:id' , delReview)
router.get('/reviews/getallreview/' , getAllReviews)

module.exports  = router ;