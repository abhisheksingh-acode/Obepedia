const express = require("express");
const router = express.Router();
const TokenAuth = require("../../middlewares/TokenAuth");

// Homepage Module + FAQ Module
const { getHomepage, getFaq } = require("../Admin/Homepage/index");

router.get("/home/homepage", getHomepage);
router.get("/home/faq", getFaq);

// Sidebar Module
const { getSidebar } = require("../Admin/Sidebar/index");
const { TopInstitutes } = require("./Sidebar/index");

router.get("/sidebar", getSidebar);
router.get("/sidebar/topinstitutes", TopInstitutes);

// Particular Category Name + Category Details
const {
  getCategory,
  getCategoryName,
  getCategoryDetail,
} = require("../Admin/Categories/index");

router.get("/category/getcategory_names", getCategoryName);
router.get("/category/getcategory_details", getCategory);
router.get("/category/getcategory_details/:id", getCategoryDetail);

//

// Login Module
const { Login, getLogin } = require("./Login/index");
const { RegisterUser } = require("./Register");

router.post("/login", Login);
router.get("/login", getLogin);

router.post("/register", RegisterUser);

// Suggestion Form
const { postSuggestion, getSuggestion } = require("./Suggestion_Form/index");

const { postFeedback } = require("./Feedback/index");

router.post("/feedback/postfeedback", postFeedback);

router.post("/suggestion_form/post_suggestion", postSuggestion);
router.get("/suggestion_form/get_suggestion", getSuggestion);

// Job Form Module
const { postJobForm, getJobForm,getJobFormByInstituteId } = require("./Job_Form/index");

router.post("/job_form/post_job_form", postJobForm);
router.get("/job_form/get_job_form", getJobForm);
router.get("/job_form/institute/:id", getJobFormByInstituteId);

// User details
const { UserDet, GetUserDet, GetDet } = require("./UserDetails/index");

router.post("/userdet/:id", UserDet);
router.get("/getuserdet/:id", GetUserDet);
router.get("/onlyuserdet/:id", GetDet);

// Review Module
const {
  postReviewOnCourse,
  postReviewOnInstitute,
} = require("../Admin//Reviews/index");

router.post("/reviews/postreviewoncourse/:id", TokenAuth, postReviewOnCourse);
router.post(
  "/reviews/postreviewoninstitute/:id",
  TokenAuth,
  postReviewOnInstitute
);

const { getReviewByUserId } = require("./Reviews/index");

router.get("/reviews/:id", TokenAuth, getReviewByUserId);

// UserRights Module (Bookmark , Follow etc)
const {
  postBookmark,
  getBookmark,
  getFollow,
  unMark,
  postFollow,
  unFollow,
  getSavedCourses,
  postSaveVacancy,
  getSaveVacancy,
} = require("./UserRights/index");

router.post("/user_rights/postbookmark/:id", TokenAuth, postBookmark);
router.get("/user_rights/getbookmark/:id", TokenAuth, getBookmark);
router.get("/user_rights/getsavedcourse/:id", TokenAuth, getSavedCourses);
router.delete("/user_rights/unmark/:id", TokenAuth, unMark);

router.post("/user_rights/postfollow/:id", TokenAuth, postFollow);
router.get("/user_rights/getfollow/:id", TokenAuth, getFollow);
router.delete("/user_rights/unfollow/:id", TokenAuth, unFollow);

router.post("/user_rights/postvacancy/:id", TokenAuth, postSaveVacancy);
router.get("/user_rights/postvacancy/:id", TokenAuth, getSaveVacancy);
// Vacancy Module
const {
  getVacancy,
  getVacancyByInstitute,
  getAllVacancies,
  postVacancy,
} = require("../Institute/Vacancy/index");

router.get("/vacancy/postvacancydetails/:id", postVacancy);
router.get("/vacancy/getvacancy/:id", getVacancy);
router.get("/vacancy/getvacancybyinstitute/:id", getVacancyByInstitute);
router.get("/vacancy/allvacancies", getAllVacancies);

// Institute Page
const {
  InstitutePage,
  getAllInstitute,
  getFeaturedInstitute,
  getSidebarInstitute
} = require("./Institute/index");

router.get("/institute/getinstitute/:id", InstitutePage);
router.get("/institute/getallinstitute", getAllInstitute);
router.get("/institute/getsidebarinstitute", getSidebarInstitute);
router.get("/institute/getfeaturedinstitute", getFeaturedInstitute);

const reviewsoninstitute = require("../../models/Reviews/reviewsoninstitute");

router.get("/institute/getinstitute/rating/:id", async (req, res) => {
  const result = await reviewsoninstitute.aggregate([
    {
      $match: {
        institute_id: req.params.id,
      },
    },
    {
      $group: {
        _id: "$institute_id",
        rating: { $avg: "$rating" },
      },
    },
  ]);

  return res.json(result)
});

// All  Institutes
// const {getInsti} = require('../Admin/InstituteList/index');

// router.get('/institute/getallinstitute'  , getInsti)

// Compare Module
const { Compare } = require("./Compare/index");

router.get("/compare/:id/:cid", Compare);

const {
  postSidebarRating,
  getSidebarRating,
  detSiderating,
} = require("./SidbarRating/index");

router.post("/sidebar/sidebarrating", postSidebarRating);
router.get("/sidebar/getsidebarrating/:id", getSidebarRating);
router.delete("/sidebar/delsidebarrating/:id", detSiderating);

// Search
const {
  Search,
  SearchInstitute,
  listingInstituteFilter,
} = require("./Search/index");

router.get("/search/:key?", Search);
router.get("/searchinstitute", SearchInstitute);
router.post("/listing/filter", listingInstituteFilter);

// user Course
const { getCoursebyid } = require("../Institute/Course/index");
router.get("/coursebyid/:id", getCoursebyid);

module.exports = router;
