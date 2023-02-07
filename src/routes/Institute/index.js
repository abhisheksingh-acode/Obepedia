const express = require("express");
const router = express.Router();
const TokenAuth = require("../../middlewares/TokenAuth");

// Login Module
const { Login } = require("./Login/auth");

router.post("/login", Login);

// Institute Details
const { InstiDetails, getInstiUsers } = require("./InstiDetails/index");

router.post("/instidetails/:id", TokenAuth, InstiDetails);
router.get("/getinstiusers/:id", TokenAuth, getInstiUsers);

// Profile Module
const {
  postProfile,
  getProfile,
  delProfile,
  putProfile,
} = require("./Profile/index");

router.post("/profile/postprofile/:id", TokenAuth, postProfile);
router.get("/profile/getprofile/:id", TokenAuth, getProfile);
router.delete("/profile/delprofile/:id", TokenAuth, delProfile);
router.put("/profile/putprofile/:id", TokenAuth, putProfile);

// faculty Module
const { postfaculty, getfaculty, delfaculty } = require("./Faculty/index");

router.post("/faculty/postfaculty/:id", TokenAuth, postfaculty);
router.get("/faculty/getfaculty/:id", TokenAuth, getfaculty);
router.delete("/faculty/delfaculty/:id", TokenAuth, delfaculty);

// Vacancy Module
const {
  postVacancy,
  getVacancy,
  delVacancy,
  getVacancyByInstitute,
} = require("./Vacancy/index");

router.post("/vacancy/postvacancy/:id", postVacancy);
router.get("/vacancy/getvacancy/:id", getVacancy);
router.get("/vacancy/getvacancybyinstitute/:id", getVacancyByInstitute);
router.delete("/vacancy/delvacancy/:id", delVacancy);

// Course Module
const { postCourse, getCourse, delCourse } = require("./Course/index");

router.post("/course/postcourse/:id", postCourse);
router.get("/course/getcourse/:id", getCourse);
router.delete("/course/delcourse/:id", delCourse);

// Gallary Module
const { postGallary, getGallary, delGallary } = require("./Gallary/index");

router.post("/gallary/postgallary/:id", postGallary);
router.get("/gallary/getgallary/:id", getGallary);
router.delete("/gallary/delgallary", delGallary);

// Review Module
const {
  getAllReviewsOnCourse,
  getAllReviewsOnInstitute,
  deleteReview,
  ReviewOnInstitute,
  ReviewOnCourse,
  ReviewByStudent,
  postReviewOnCourse,
  postReviewOnInstitute,
} = require("../Admin/Reviews/index");

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

module.exports = router;
