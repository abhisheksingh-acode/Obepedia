const express = require("express");
const mongoose = require("mongoose");
const VacancyModel = require("../../../models/Vacancy/vacancy");
const VacancyDetailsModel = require("../../../models/Vacancy/vacancydetails");

// Posting  Vacancy
const postVacancy = (req, resp) => {
  const { name, timming, location, about, company, institute_id } = req.body;
  const vacancy = new VacancyModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    timming,
    location,
    about,
    company,
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
  VacancyModel.find()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
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

// //////////////////////////////////////////////////////////////

// const postVacancyDetails = (req, resp) => {
//   const Vacancy = VacancyModel.findOne({_id:req.params.id})
//   .then(value=>{
//     const {
//       name,
//       timming,
//       location,
//       company,
//       company_banner,
//       about_company,
//       about_job,
//       skills,
//       responsibilities,
//       institute_id,
//       vacancy_id,
//     } = req.body;

//     const VacancyDetails = new VacancyDetailsModel({
//       _id: new mongoose.Types.ObjectId(),
//       name:value.name,
//       timming:value.timming,
//       location:value.location,
//       company:value.company,
//       company_banner,
//       about_company,
//       about_job,
//       skills,
//       responsibilities,
//       institute_id:value.institute_id,
//       vacancy_id:req.params.id,
//     })
//       .save()
//       .then((result) => {
//         resp.status(200).json(result);
//       })
//       .catch((err) => {
//         resp.status(500).json({ error: err });
//       });
//   })

//   .catch((err) => {
//     resp.status(500).json({ error: err });
//   });

// };

const getVacancyDetails = async (req, resp) => {
  const vacancy_id = req.params.id;
  try {
    const response = await VacancyDetailsModel.findOne({ vacancy_id });
    resp.status(200).json(response);
  } catch (error) {
    resp.status(500).json(error);
  }
};

module.exports = {
  postVacancy,
  getVacancy,
  delVacancy,
  getVacancyByInstitute,
  getAllVacancies,
  getVacancyDetails,
  // postVacancyDetails
};
