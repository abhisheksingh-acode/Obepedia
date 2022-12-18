const express = require('express');
const router = express.Router();

const TokenAuth = require('../../middlewares/TokenAuth')

// Account Module 
const accountRouter = require('./account/index');

router.post('/account/:id' , accountRouter )

// User List Module
const {getUsers, delUsers ,GetUserDet} = require('./UserList/index');

  
router.get('/userlist/getusers' , TokenAuth ,   getUsers)
router.get('/userlist/getusersdet/:id' ,TokenAuth ,  GetUserDet)
router.delete('/userlist/delusers/:id' ,TokenAuth , delUsers)


// Institute List Module
const {getInsti , getInstiDet , delInsti} = require('./InstituteList/index');

router.get('/instilist/getinsti' , TokenAuth , getInsti)
router.get('/instilist/getinstidet/:id' , TokenAuth , getInstiDet)
router.delete('/instilist/delinsti/:id' , TokenAuth , delInsti)

// Categories Module

const {postCategory , getCategory , delCategory} = require('./Categories/index')

router.get('/category/getcategories' , TokenAuth,  getCategory)
router.post('/category/addcategories' , TokenAuth,  postCategory)
router.delete('/category/delcategories/:id' , TokenAuth,  delCategory)

// Sidebar Module 

const {getSidebar , postSidebar} = require('./Sidebar/index')

router.get('/sidebar/getsidebar', TokenAuth ,  getSidebar)
router.post('/sidebar/postsidebar', TokenAuth ,  postSidebar)

// Homepage Module  + Faq Module

const {postHomepage ,  getHomepage , deleteHomepage ,  postFaq , getFaq , deleteFaq} = require('./Homepage/index')

router.post('/homepage/posthomepage' , TokenAuth , postHomepage)
router.get('/homepage/gethomepage' , TokenAuth , getHomepage)
router.delete('/homepage/deletehomepage/:id' , TokenAuth , deleteHomepage)

router.post('/homepage/postfaq' , TokenAuth ,  postFaq)
router.get('/homepage/getfaq' , TokenAuth ,  getFaq)
router.delete('/homepage/deletefaq/:id' , TokenAuth ,  deleteFaq)


// Reviews Module
const {postReview , getAllReview , deleteReview , ReviewOnInstitute , ReviewOnCourse , ReviewByStudent  }  = require('../Admin/Reviews/index')


router.post('/reviews/postreview/:id' , TokenAuth , postReview)
router.get('/reviews/getallreview' , TokenAuth , getAllReview)
router.get('/reviews/reviewsoninstitute/:id' , TokenAuth , ReviewOnInstitute)
router.get('/reviews/reviewsoncourse/:id' , TokenAuth , ReviewOnCourse)
router.get('/reviews/reviewsbystudent/:id' , TokenAuth , ReviewByStudent)
router.delete('/reviews/deletereview/:id' , TokenAuth , deleteReview)

module.exports = router ;