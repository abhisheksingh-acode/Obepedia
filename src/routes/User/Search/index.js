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
        { name: { $regex: req.params.key } },
        { location: { $regex: req.params.key } },
      ],
    });
    let response2 = await VacancyModel.find({
      $or: [
        { name: { $regex: req.params.key } },
        { responsibilities: { $regex: req.params.key } },
        { skills: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
        { location: { $regex: req.params.key } },
        { timming: { $regex: req.params.key } },
      ],
    });
    let response3 = await course.find({
      $or: [
        { course: { $regex: req.params.key } },
        { medium: { $regex: req.params.key } },
        { duration: { $regex: req.params.key } },
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
  try {
    const { name, location } = req.query;
    let response = await InstituteProfileModel.find({
      $or: [{ name: { $regex: name } }, { location: { $regex: location } }],
    });
    let result = { response };
    resp.status(200).json(result);
  } catch (error) {
    let response = await InstituteProfileModel.find();
    let result2 = { response };
    resp.status(200).json({ result: result2 });
  }
};

module.exports = { Search, SearchInstitute };
