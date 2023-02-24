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
const User = require("../../../models/signupmodel");

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
          institute_id: mongoose.Types.ObjectId(institute_id),
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

    let response8 = await reviewsoninstitute
      .find({ institute_id, overall: 1 })
      .countDocuments();

    //   {
    //     $match: {
    //       institute_id: mongoose.Types.ObjectId(institute_id),
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$overall",
    //       totalRatingCount: { $count: {} },
    //     },
    //   },
    // ]);

    return resp.json(response8);

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

const getSidebarInstitute = async (req, resp) => {
  let response = await User.aggregate([
    {
      $lookup: {
        from: "instituteprofilemodels",
        foreignField: "institute_id",
        localField: "_id",
        as: "institute",
      },
    },
    {
      $match: { role: "institute", approved: true },
    },
    {
      $limit: 8,
    },
    {
      $sort: { _id: -1 },
    },
  ]);
  return resp.status(200).json(response);
};

const getFeaturedInstitute = async (req, resp) => {
  // let response = await InstituteProfileModel.find();

  let response = await User.aggregate([
    {
      $lookup: {
        from: "instituteprofilemodels",
        foreignField: "institute_id",
        localField: "_id",
        as: "institute",
        pipeline: [
          {
            $match: { featured: true },
          },
        ],
      },
    },
    {
      $match: {
        role: "institute",
        approved: true,
      },
    },
    {
      $limit: 8,
    },
    {
      $sort: { _id: -1 },
    },
   
  ]);

  return resp.status(200).json(response);
};

module.exports = {
  InstitutePage,
  getAllInstitute,
  getFeaturedInstitute,
  getSidebarInstitute,
};
