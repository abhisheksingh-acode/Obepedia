// Now we are going to fetch ASll details of specific institute
const express = require("express");
const mongoose = require("mongoose");
const course = require("../../../models/Course/course");

// now import all required models
const InstituteProfileModel = require("../../../models/Instituteprofile/instituteprofile");
const VacancyModel = require("../../../models/Vacancy/vacancy");
const CourseModel = require("../../../models/Course/course");
const reviewsoncoursemodel = require("../../../models/Reviews/reviewsoncourse");
const Sponsor = require("../../../models/Sponsor/Sponsor");

const Search = async (req, resp) => {
  try {
    let response2 = await VacancyModel.find({
      $or: [
        { name: { $regex: `^${req.params.key}`, $options: "i" } },
        { responsibilities: { $regex: `^${req.params.key}`, $options: "i" } },
        { skills: { $regex: `^${req.params.key}`, $options: "i" } },
        { company: { $regex: `^${req.params.key}`, $options: "i" } },
        { location: { $regex: `${req.params.key}`, $options: "i" } },
      ],
    }).select({ _id: 0, institute_id: 1 });

    let response3 = await course
      .find({
        $or: [
          { course: { $regex: `^${req.params.key}`, $options: "i" } },
          { medium: { $regex: req.params.key } },
        ],
      })
      .select({ _id: 0, institute_id: 1 });

    let ids = response2.map((el) =>
      el.institute_id !== "undefined"
        ? mongoose.Types.ObjectId(el.institute_id)
        : mongoose.Types.ObjectId("")
    );
    let ids2 = response3.map((el) =>
      el.institute_id !== "undefined"
        ? mongoose.Types.ObjectId(el.institute_id)
        : mongoose.Types.ObjectId("")
    );

    let response = await InstituteProfileModel.find({
      $or: [
        { name: { $regex: `^${req.params.key}`, $options: "i" } },
        { location: { $regex: `${req.params.key}`, $options: "i" } },
        {
          institute_id: { $in: [...ids, ...ids2] },
        },
      ],
    });

    let result = {
      institute: response,
    };
    resp.status(200).json(result);
  } catch (error) {
    resp.status(500).json(false);
  }
};

const SearchInstitute = async (req, resp) => {
  const { name, location, sort } = req.query;
  let sortQuery = ``;
  switch (sort) {
    case "namea":
      sortQuery = { name: 1 };
      break;
    case "named":
      sortQuery = { name: -1 };
      break;
    case "latest":
      sortQuery = { _id: -1 };
      break;
    case "oldest":
      sortQuery = { _id: 1 };
      break;

    default:
      sortQuery = { _id: -1 };
      break;
  }
  try {
    let response = await InstituteProfileModel.find({
      $or: [
        {
          name: { $regex: `^${name}`, $options: "i" },
        },
        { location: { $regex: `${location}`, $options: "i" } },
      ],
    });
    let result = { response };
    resp.status(200).json(result);
  } catch (error) {
    let response = await InstituteProfileModel.find().sort(sortQuery);
    let result2 = { response };
    resp.status(200).json(result2);
  }
};

const listingInstituteFilter = async (req, res) => {
  const {
    category,
    location,
    subject,
    rating,
    available,
    key,
    budget_min,
    budget_max,
    sort,
  } = req.body;

  let sortQuery = ``;
  switch (sort) {
    case "namea":
      sortQuery = { name: 1 };
      break;
    case "named":
      sortQuery = { name: -1 };
      break;
    case "latest":
      sortQuery = { _id: -1 };
      break;
    case "oldest":
      sortQuery = { _id: 1 };
      break;

    default:
      sortQuery = { _id: -1 };
      break;
  }

  let regexSubject = subject.map(function (e) {
    return new RegExp("^[" + e + "].*", "i");
  });

  // const courses = await CourseModel.find({
  //   subject: { $in: subject },
  //   category: { $eq: mongoose.Types.ObjectId(category) },
  // }).select({ _id: 0, institute_id: 1 });

  let regexcity = location.map(function (e) {
    return new RegExp("^[" + e + "].*", "i");
  });

  // const output = courses.map((el) => el.institute_id);

  // const institutes = await InstituteProfileModel.find({
  //   institute_id: { $in: output },
  //   $or: [
  //     { location: { $in: regex } },
  //     { city: { $in: regex } },
  //     { name: { $regex: `^${key}`, $options: "i" } },
  //   ],
  // }).sort(sortQuery);

  const institutes = await CourseModel.aggregate([
    {
      $match: {
        category: { $eq: mongoose.Types.ObjectId(category) },
        // subject: { $in: regexSubject },
      },
    },
    {
      $lookup: {
        from: "instituteprofilemodels",
        localField: "institute_id",
        foreignField: "institute_id",
        as: "institute",
        // pipeline: [
        // {
        //   $match: {
        //     name: { $regex: `^${key}`, $options: "i" },
        //   },
        // },
        //   {
        //     $sort: sortQuery,
        //   },
        // ],
      },
    },
    {
      $project: { result: "$institute", _id: 0 },
    },
  ]);

  const featured = await Sponsor.find({
    category: { $eq: mongoose.Types.ObjectId(category) },
  })
    .sort({ order: 1 })
    .populate({ path: "category" })
    .populate({ path: "institute_id" });

  return res.status(200).json({
    featured: featured,
    institutes: institutes[0] ? institutes[0].result : [],
  });
  // return res.status(200).json(institutes);
};

const instituteByCourseCategory = async () => {
  const featured = await CourseModel.aggregate([
    {
      $match: { category: { $eq: mongoose.Types.ObjectId(category) } },
    },
    {
      $lookup: {
        from: "instituteprofilemodels",
        localField: "institute_id",
        foreignField: "institute_id",
        as: "institute",
        pipeline: [
          {
            $match: { featured: false },
          },
          {
            $sort: { _id: 1 },
          },
        ],
      },
    },
    {
      $project: { result: "$institute", _id: 0 },
    },
  ]);

  return res.status(200).json({
    institutes: featured[0] ? featured[0].result : [],
  });
};

module.exports = {
  Search,
  SearchInstitute,
  listingInstituteFilter,
  instituteByCourseCategory,
};
