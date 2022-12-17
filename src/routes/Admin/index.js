const express = require('express');
const router = express.Router();

const TokenAuth = require('../../middlewares/TokenAuth')

// Account Module 
const accountRouter = require('./account/index');

router.post('/account/:id' , accountRouter )

// User List Module
const {getUsers, delUsers ,GetUserDet} = require('./UserList/index');

  
router.get('/userlist/getusers' , getUsers)
router.get('/userlist/getusersdet/:id' , GetUserDet)
router.delete('/userlist/delusers/:id' , delUsers)


// Institute List Module
const {getInsti , getInstiDet , delInsti} = require('./InstituteList/index');

router.get('/instilist/getinsti' , getInsti)
router.get('/instilist/getinstidet/:id' , getInstiDet)
router.delete('/instilist/delinsti/:id' , delInsti)

// Categories Module

const {postCategory , getCategory , delCategory} = require('./Categories/index')

router.get('/category/getcategories' , getCategory)
router.post('/category/addcategories' , postCategory)
router.delete('/category/delcategories/:id' , delCategory)

// Sidebar Module 

const {getSidebar , postSidebar} = require('./Sidebar/index')

router.get('/sidebar/getsidebar', getSidebar)
router.post('/sidebar/postsidebar', postSidebar)

// Homepage Module  + Faq Module

const {postHomepage ,  getHomepage , deleteHomepage ,  postFaq , getFaq , deleteFaq} = require('./Homepage/index')

router.post('/homepage/posthomepage' , postHomepage)
router.get('/homepage/gethomepage' , getHomepage)
router.delete('/homepage/deletehomepage/:id' , deleteHomepage)

router.post('/homepage/postfaq' , postFaq)
router.get('/homepage/getfaq' , getFaq)
router.delete('/homepage/deletefaq/:id' , deleteFaq)


// Reviews Module
const {postReview , getAllReview , deleteReview , ReviewOnInstitute , ReviewOnCourse , ReviewByStudent  }  = require('../Admin/Reviews/index')


router.post('/reviews/postreview/:id' , postReview)
router.get('/reviews/getallreview' , getAllReview)
router.get('/reviews/reviewsoninstitute/:id' , ReviewOnInstitute)
router.get('/reviews/reviewsoncourse/:id' , ReviewOnCourse)
router.get('/reviews/reviewsbystudent/:id' , ReviewByStudent)
router.delete('/reviews/deletereview/:id' , deleteReview)

module.exports = router ;