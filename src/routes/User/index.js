const express = require('express');
const router = express.Router();
const TokenAuth = require('../../middlewares/TokenAuth');

// Homepage Module + FAQ Module
const {getHomepage , getFaq} = require('../Admin/Homepage/index')

router.get('/home/homepage' , getHomepage)
router.get('/home/faq' , getFaq)

// Sidebar Module
const {getSidebar} = require('../Admin/Sidebar/index')
const {TopInstitutes} = require('./Sidebar/index')

router.get('/sidebar' , getSidebar)
router.get('/sidebar/topinstitutes' , TopInstitutes)

// Particular Category Name + Category Details
const { getCategory , getCategoryName } = require('../Admin/Categories/index')

router.get('/category/getcategory_names' , getCategoryName);
router.get('/category/getcategory_details' , getCategory);

// 

// Login Module
const {Login , getLogin} = require('./Login/index');

router.post('/login' , Login)
router.get('/login' , getLogin)

// Suggestion Form
const {postSuggestion , getSuggestion} = require('./Suggestion_Form/index')

router.post('/suggestion_form/post_suggestion' , postSuggestion)
router.get('/suggestion_form/get_suggestion' , getSuggestion)


// Job Form Module
const {postJobForm , getJobForm} = require('./Job_Form/index')

router.post('/job_form/post_job_form' , TokenAuth , postJobForm)
router.get('/job_form/get_job_form' , getJobForm)

// User details 
const {UserDet , GetUserDet , GetDet } = require('./UserDetails/index');


router.post('/userdet/:id' , UserDet);
router.get('/getuserdet/:id' , GetUserDet);
router.get('/onlyuserdet/:id' , GetDet);

// Review Module
const {postReviewOnCourse , postReviewOnInstitute }  = require('../Admin//Reviews/index')

router.post('/reviews/postreviewoncourse/:id' , TokenAuth , postReviewOnCourse)
router.post('/reviews/postreviewoninstitute/:id' , TokenAuth , postReviewOnInstitute)


// UserRights Module (Bookmark , Follow etc)
const {postBookmark , getBookmark , getFollow  , unMark , postFollow  , unFollow} = require('./UserRights/index')

router.post('/user_rights/postbookmark/:id' , TokenAuth , postBookmark );
router.get('/user_rights/getbookmark/:id' , TokenAuth , getBookmark );
router.delete('/user_rights/unmark/:id' , TokenAuth , unMark);

router.post('/user_rights/postfollow/:id' , TokenAuth , postFollow );
router.get('/user_rights/getfollow/:id' , TokenAuth , getFollow);
router.delete('/user_rights/unfollow/:id' , TokenAuth , unFollow);

// Vacancy Module 
const {getVacancy , getVacancyByInstitute , getAllVacancies} = require('../Institute/Vacancy/index')

router.get('/vacancy/getvacancy/:id' , getVacancy)
router.get('/vacancy/getvacancybyinstitute/:id' , getVacancyByInstitute)
router.get('/vacancy/allvacancies' , getAllVacancies)


// Institute Page
const { InstitutePage , getAllInstitute } = require('./Institute/index')

router.get('/institute/getinstitute/:id' , InstitutePage )
router.get('/institute/getallinstitute' , getAllInstitute )

// All  Institutes 
// const {getInsti} = require('../Admin/InstituteList/index');

// router.get('/institute/getallinstitute'  , getInsti)


// Compare Module
const {Compare} = require('./Compare/index')

router.get('/compare/:id/:cid' , Compare)


const {postSidebarRating,  getSidebarRating, detSiderating} = require('./SidbarRating/index')

router.post('/sidebar/sidebarrating' , postSidebarRating)
router.get('/sidebar/getsidebarrating/:id' , getSidebarRating)
router.delete('/sidebar/delsidebarrating/:id' , detSiderating)


// Search
const {Search} = require('./Search/index')

router.get('/search/:key' , Search)

module.exports  = router ;