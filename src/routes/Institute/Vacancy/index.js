const express = require("express");
const mongoose = require("mongoose");
const VacancyModel = require("../../../models/Vacancy/vacancy");
const Job_Form_Model = require("../../../models/Job_Form/job_form")

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
    const limit = req.query.limit;

    let result = await VacancyModel.find().sort({ _id: -1 });

    if (limit) {
      result = await VacancyModel.find().limit(limit).sort({ _id: -1 });
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
