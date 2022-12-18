const express = require("express");
const mongoose = require("mongoose");
const CourseModel = require("../../../models/Course/course");

// Adding course Information
const postCourse = (req, resp) => {
  const { course, online, offline, medium, duration , institute_id } = req.body;
  const Course = new CourseModel({
    _id: new mongoose.Types.ObjectId(),
    course,
    online,
    offline,
    medium,
    duration,
    institute_id : req.params.id
  })
    .save()
    .then((result) => {
      resp.status(200).json({ result });
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

// Getting course Information
const getCourse = (req, resp) => {
  const institute_id = req.params.id ; 
  CourseModel.find({institute_id})
    .then((result) => {
      resp.status(200).json({ YourData: result });
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

// Delete Course
const delCourse = (req, resp) => {
  CourseModel.findOne({ _id: req.params.id })
    .deleteOne()
    .then((result) => {
      resp.status(200).json({ YourData: result });
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

module.exports = { postCourse, getCourse, delCourse };
