// Now we are going to fetch ASll details of specific institute
const express = require("express");
const mongoose = require("mongoose");

// now import all required models
const InstituteProfileModel = require("../../../models/Instituteprofile/instituteprofile");
const CourseModel = require("../../../models/Course/course");
const facultyModel = require("../../../models/Faculty/faculty");
const GallaryModel = require("../../../models/Gallary/gallary");
const VacancyModel = require("../../../models/Vacancy/vacancy");
const reviewsoninstitute = require("../../../models/Reviews/reviewsoninstitute");

const InstitutePage = async (req, resp) => {
  try {
    const institute_id = req.params.id;
    let response = await InstituteProfileModel.findOne({ institute_id });
    let response2 = await CourseModel.find({institute_id})
    let response3 = await facultyModel.find({institute_id})
    let response4 = await GallaryModel.find({institute_id})
    let response5 = await VacancyModel.find({institute_id})
    let response6 = await reviewsoninstitute.find({institute_id})
    resp.status(200).json([...response , ...response2 , ...response3 , ...response4 , ...response5 , ...response6])
  } catch (error) {
    resp.status(500).json(error)
  }
};


module.exports = { InstitutePage };
