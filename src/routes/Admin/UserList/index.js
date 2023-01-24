const { response } = require("express");
const express = require("express");
const User = require("../../../models/signupmodel");
const UserModel = require("../../../models/UserModel/usermodel");
const CourseModel = require("../../../models/Course/course")
const ReviewOnCourse = require("../../../models/Reviews/reviewsoncourse")
const FollowModel = require("../../../models/Follow/follow") 
const BookmarkModel = require("../../../models/Bookmark/bookmark");
const InstituteProfileModel = require("../../../models/Instituteprofile/instituteprofile");


// Getting all users ( role:user is deafult)
const getUsers = async (req, resp) => {
  const val = req.body.role ? req.body.role : "user";
  const result = await User.find({ role: val }).sort({ _id: -1 });

  return resp.status(200).json(result);
};

// If admin wants to delete user the  he just pass his id as params
const delUsers = async (req, resp) => {
  await User.find({ _id: req.params.id }).deleteMany();

  return resp.status(200).json({ msg: "users deleted" });
};

const destroy = (req, res) => {
  req.body.ids.forEach(async (el, index) => {
    await User.findByIdAndDelete(el);
    await UserModel.find({ ref_id: el }).deleteOne();
  });

  return res.status(200).json({ msg: "delete operation is succeed" });
};

// When admin want to see whole information of user
const GetUserDet = async (req, resp) => {

  const ID = req.params.id
  const user = await User.find({ _id: ID });
  const personal = await UserModel.find({ ref_id: ID });

  const reviews = await ReviewOnCourse.find({ref_id: ID})
  let savedInst = await FollowModel.find({user_id : ID}).populate("institute_id")
  const savedCourse = await BookmarkModel.find({user_id : ID})
   
  // savedInst = savedInst.map(async (el) => {
  //      return await In
  // })


  return resp.status(200).json({user, personal, reviews, savedCourse, savedInst})

};

module.exports = { getUsers, delUsers, GetUserDet, destroy };
