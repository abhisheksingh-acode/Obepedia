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
    let response = await InstituteProfileModel.find({ institute_id });
    let response2 = await CourseModel.find({ institute_id });
    let response3 = await facultyModel.find({ institute_id });
    let response4 = await GallaryModel.find({ institute_id });
    let response5 = await VacancyModel.find({ institute_id });
    let response6 = await reviewsoninstitute
      .find({ institute_id })
      .limit(8)
      .sort({ _id: -1 });

    let response7 = await reviewsoninstitute.aggregate([
      {
        $match: {
          institute_id: institute_id,
        },
      },
      {
        $group: {
          _id: "$institute_id",
          rating: { $avg: "$rating" },
          totalRatingCount: { $count: {} },
        },
      },
    ]);

    let result = {
      institute_profile: response,
      course: response2,
      faculty: response3,
      gallary: response4,
      vacancy: response5,
      reviews: response6,
      institute_rating: response7,
    };
    resp.status(200).json(result);

    // console.log(result.faculty[0].name)
  } catch (error) {
    resp.status(500).json(error);
  }
};

const getAllInstitute = async (req, resp) => {
  let response = await InstituteProfileModel.find();
  return resp.status(200).json(response);
};

const getFeaturedInstitute = async (req, resp) => {
  let response = await InstituteProfileModel.find();
  return resp.status(200).json(response);
};

module.exports = { InstitutePage, getAllInstitute, getFeaturedInstitute };
