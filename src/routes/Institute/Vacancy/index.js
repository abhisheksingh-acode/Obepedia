const express = require("express");
const mongoose = require("mongoose");
const VacancyModel = require("../../../models/Vacancy/vacancy");
const Job_Form_Model = require("../../../models/Job_Form/job_form");
const moment = require("moment");

// Posting  Vacancy
const postVacancy = async (req, resp) => {
  const vacancy = new VacancyModel({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
    institute_id: req.params.id,
  }).save();

  const result = await vacancy;

  return resp.status(200).json(result);
};

// Get Vacancy
const getVacancy = async (req, resp) => {
  const vacancy_id = req.params.id;

  const data = await VacancyModel.findOne({ _id: vacancy_id });

  const result = {
    ...data._doc,
    posted: moment().diff(data._doc.date, "days", false),
  };

  return resp.status(200).json(result);
};

// Get all vacancies
const getAllVacancies = async (req, resp) => {
  const limit = req.query.limit;
  const key = req.query.key;
  const sort = req.query.sort;
  const category = req.query.category;

  let sortQuery = {};

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

  let result = await VacancyModel.find({
    name: { $regex: `^${key}`, $options: "i" },
    category: { $eq: category },
  }).sort(sortQuery);

  if (limit) {
    result = await VacancyModel.find({
      name: { $regex: `^${key}`, $options: "i" },
      category: { $eq: category },
    })
      .sort(sortQuery)
      .limit(limit);
  }

  return resp.status(200).json(result);
};

// Get All Vacancies by a particular institute
const getVacancyByInstitute = (req, resp) => {
  const institute_id = req.params.id;
  VacancyModel.find({ institute_id })
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

// Delete vacancy
const delVacancy = (req, resp) => {
  VacancyModel.findOne({ _id: req.params.id })
    .deleteOne()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

module.exports = {
  postVacancy,
  getVacancy,
  delVacancy,
  getVacancyByInstitute,
  getAllVacancies,
};
