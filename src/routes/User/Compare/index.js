const express = require("express");
const mongoose = require("mongoose");
const InstituteProfileModel = require("../../../models/Instituteprofile/instituteprofile");
const CourseModel = require("../../../models/Course/course");

// Getting course Information
const getCourse = (req, resp) => {
  const institute_id = req.params.id;
  const { course_id } = req.body;
  CourseModel.find({ institute_id })
    .then((result) => {
      resp.status(200).json({ YourData: result });
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

const Compare = async  (req, resp) => {
  const  institute_id  = req.params.id;
  try {
    const response = await InstituteProfileModel.find({institute_id})
    if (response.length>0) {
      const response2 = await CourseModel.find({institute_id})
      resp.status(200).json(response2)
    }
  } catch (error) {
    resp.status(200).json(error)
  }
};

module.exports = { Compare  };
