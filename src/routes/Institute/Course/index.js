const express = require("express");
const mongoose = require("mongoose");
const CourseModel = require("../../../models/Course/course");
const reviewsoncoursemodel = require("../../../models/Reviews/reviewsoncourse");

// Adding course Information
const postCourse = async (req, resp) => {
  const Course = new CourseModel({
    ...req.body,
    _id: new mongoose.Types.ObjectId(),
    institute_id: req.params.id,
  }).save();

  const result = await Course;
  return resp.status(200).json(result);
};

// Getting course Information
const getCourse = (req, resp) => {
  const institute_id = req.params.id;
  CourseModel.find({ institute_id })
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};
const getCoursebyid = async (req, resp) => {
  const _id = req.params.id;
  const ratings = await reviewsoncoursemodel
    .find({ course_id: _id })
    .sort({ _id: -1 })
    .limit(8);
  const result = await CourseModel.findOne({ _id }).populate("category");

  return resp.status(200).json({ result, ratings });
};

// Delete Course
const delCourse = async (req, resp) => {
  req.body.ids.forEach(async (el, index) => {
    await CourseModel.findByIdAndDelete(el);
  });

  return resp.status(200).json(result);
};

module.exports = { postCourse, getCourse, delCourse, getCoursebyid };
