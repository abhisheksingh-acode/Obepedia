// Now we are going to fetch ASll details of specific institute
const express = require("express");
const mongoose = require("mongoose");
const course = require("../../../models/Course/course");

// now import all required models
const InstituteProfileModel = require("../../../models/Instituteprofile/instituteprofile");
const VacancyModel = require("../../../models/Vacancy/vacancy");

const Search = async (req, resp) => {
  try {
    let response = await InstituteProfileModel.find({
      $or: [
        { name: { $regex: `^${req.params.key}`, $options: "i" } },
        { location: { $regex: `${req.params.key}`, $options: "i" } },
      ],
    });
    let response2 = await VacancyModel.find({
      $or: [
        { name: { $regex: `^${req.params.key}`, $options: "i" } },
        { responsibilities: { $regex: `^${req.params.key}`, $options: "i" } },
        { skills: { $regex: `^${req.params.key}`, $options: "i" } },
        { company: { $regex: `^${req.params.key}`, $options: "i" } },
        { location: { $regex: `${req.params.key}`, $options: "i" } },
      ],
    });
    let response3 = await course.find({
      $or: [
        { course: { $regex: `^${req.params.key}`, $options: "i" } },
        { medium: { $regex: req.params.key } },
      ],
    });

    let result = {
      institute: response,
      vacancy: response2,
      course_list: response3,
    };
    resp.status(200).json(result);
  } catch (error) {
    resp.status(500).json(error);
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

module.exports = { Search, SearchInstitute };
