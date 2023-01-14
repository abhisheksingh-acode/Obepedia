const express = require("express");
const mongoose = require("mongoose");
const VacancyModel = require("../../../models/Vacancy/vacancy");

// Posting  Vacancy
const postVacancy = (req, resp) => {
  const {
    name,
    timming,
    location,
    about,
    company,
    institute_id,
    company_banner,
    about_company,
    about_job,
    skills,
    responsibilities,
  } = req.body;
  const vacancy = new VacancyModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    timming,
    location,
    about,
    company,
    company_banner,
    about_company,
    about_job,
    skills,
    responsibilities,
    institute_id: req.params.id,
  })
    .save()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

// Get Vacancy
const getVacancy = (req, resp) => {
  const vacancy_id = req.params.id;
  VacancyModel.find({ _id: vacancy_id })
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

// Get all vacancies
const getAllVacancies = async (req, resp) => {
  try {
    const limit = req.query.limit;

    let result = await Job_Form_Model.find().sort({ _id: -1 });

    if (limit) {
      result = await Job_Form_Model.find().limit(8).sort({ _id: -1 });
    }

    return resp.status(200).json(result);
  } catch (error) {
    return resp.status(500).json(error);
  }
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
