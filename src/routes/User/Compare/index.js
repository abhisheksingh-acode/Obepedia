const express = require("express");
const mongoose = require("mongoose");
const InstiDetails = require('../../../models/Instituteprofile')
const CourseModel = require("../../../models/Course/course");


// Getting course Information
const getCourse = (req, resp) => {
  const institute_id = req.params.id ;
  const {course_id} = req.body  
  CourseModel.find({institute_id})
    .then(
    (result) => {resp.status(200).json({ YourData: result });}
    )
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};



module.exports = { getCourse, delCourse };