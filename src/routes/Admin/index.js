const express = require("express");
const router = express.Router();

const TokenAuth = require("../../middlewares/TokenAuth");

// Account Module
const { Account } = require("./account/index");

router.get("/account/:id", TokenAuth, Account);

// User List Module
const { getUsers, delUsers, GetUserDet, destroy } = require("./UserList/index");

router.get("/userlist/getusers", TokenAuth, getUsers);
router.get("/userlist/getusersdet/:id", TokenAuth, GetUserDet);
router.delete("/userlist/delusers/:id", TokenAuth, delUsers);
router.delete("/userlist/clear", TokenAuth, destroy);

// Institute List Module
const { getInsti, getInstiDet, delInsti, destroyInst, markFeatured} = require("./InstituteList/index");

router.get("/instilist/getinsti", TokenAuth, getInsti);
router.get("/instilist/markfeatured/:id", TokenAuth, markFeatured);
router.get("/instilist/getinstidet/:id", TokenAuth, getInstiDet);
router.delete("/instilist/delinsti/:id", TokenAuth, delInsti);
router.delete("/instilist/clear", TokenAuth, destroyInst);


// Categories Module

const {
  postCategory,
  getCategory,
  delCategory,
  modifyCategory,
} = require("./Categories/index");

router.get("/category/getcategories", TokenAuth, getCategory);
router.post("/category/addcategories", TokenAuth, postCategory);
router.put("/category/modify/:id", TokenAuth, modifyCategory);
router.delete("/category/delcategories", TokenAuth, delCategory);


const {getVacancyCategory, postVacancyCategory, deleteVacancyCategory} = require("../Admin/vacancyCategory/index");

router.get("/vacancy/get", TokenAuth, getVacancyCategory);
router.post("/vacancy/create", TokenAuth, postVacancyCategory);
router.delete("/vacancy/delete/:id", TokenAuth, deleteVacancyCategory);


// Sidebar Module

const { getSidebar, postSidebar } = require("./Sidebar/index");

router.get("/sidebar/getsidebar", TokenAuth, getSidebar);
router.post("/sidebar/postsidebar", TokenAuth, postSidebar);

// Homepage Module  + Faq Module

const {
  postHomepage,
  putHomepage,
  getHomepage,
  deleteHomepage,
  postFaq,
  getFaq,
  deleteFaq,
} = require("./Homepage/index");

router.put("/homepage/puthomepage", TokenAuth, putHomepage);
router.post("/homepage/posthomepage", TokenAuth, postHomepage);
router.get("/homepage/gethomepage", TokenAuth, getHomepage);
router.delete("/homepage/deletehomepage/:id", TokenAuth, deleteHomepage);

router.post("/homepage/postfaq", TokenAuth, postFaq);
router.get("/homepage/getfaq", TokenAuth, getFaq);
router.delete("/homepage/deletefaq/:id", TokenAuth, deleteFaq);

// Reviews Module
const {
  getAllReviewsOnCourse,
  getAllReviewsOnInstitute,
  deleteReview,
  ReviewOnInstitute,
  ReviewOnCourse,
  ReviewByStudent,
  postReviewOnCourse,
  postReviewOnInstitute,
} = require("./Reviews/index");

router.post("/reviews/postreviewoncourse/:id", TokenAuth, postReviewOnCourse);
router.post(
  "/reviews/postreviewoninstitute/:id",
  TokenAuth,
  postReviewOnInstitute
);

router.get("/reviews/reviewsoninstitute/:id", TokenAuth, ReviewOnInstitute);
router.get("/reviews/reviewsoncourse/:id", TokenAuth, ReviewOnCourse);
router.get(
  "/reviews/allreviewsoninstitute",
  TokenAuth,
  getAllReviewsOnInstitute
);
router.get("/reviews/allreviewsoncourse", TokenAuth, getAllReviewsOnCourse);

router.get("/reviews/reviewsbystudent/:id", TokenAuth, ReviewByStudent);
router.delete("/reviews/deletereview/:id", TokenAuth, deleteReview);

// Creating User
const { CreateInstitute, CreateUser } = require("./CreateUser/index");
const { UserDet } = require("../User/UserDetails/index");
const { postProfile } = require("../Institute/Profile/index");
const { route } = require("../User");
const dashboard = require("./dashboard");

router.post("/createuser", CreateUser);
router.post("/createinstitute", CreateInstitute);

router.post("newuserdetails/:id", UserDet);
router.post("newinstitutedetails", postProfile);

router.get("/dashboard", TokenAuth, dashboard)


module.exports = router;
