const UserModel = require("../../../models/UserModel/usermodel");
const InstituteProfileModel = require("../../../models/Instituteprofile/instituteprofile");
const CourseModel = require("../../../models/Course/course");
const ReviewOnCourse = require("../../../models/Reviews/reviewsoncourse")

const dashboard = async (req, res) => {
  const totalUsers = await UserModel.countDocuments();
  const totalInstitute = await InstituteProfileModel.countDocuments();
  const totalCourse = await CourseModel.countDocuments();

  const recentCourse = await CourseModel.find().limit(5).sort({_id : -1}) 
  const recentReview = await ReviewOnCourse.find().limit(5).sort({_id : -1}) 


  return res.status(200).json({totalUsers, totalInstitute, totalCourse, recentCourse, recentReview })
};

module.exports = dashboard;
