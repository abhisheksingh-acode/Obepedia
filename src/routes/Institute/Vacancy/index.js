const express = require("express");
const mongoose = require("mongoose");
const VacancyModel = require("../../../models/Vacancy/vacancy");

// Posting  Vacancy
const postVacancy = (req, resp) => {
  const { name, timming, location, about, company , institute_id } = req.body;
  const vacancy = new VacancyModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    timming,
    location,
    about,
    company,
    institute_id : req.params.id
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
  const vacancy_id = req.params.id
  VacancyModel.find({_id : vacancy_id})
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

// Get All Vacancies by a particular institute
const getVacancyByInstitute = (req, resp) => {
  const institute_id = req.params.id
  VacancyModel.find({institute_id})
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

// Delete vacancy
const delVacancy = (req,resp)=>{
  VacancyModel.findOne({_id:req.params.id})
  .deleteOne()
  .then(result=>{
    resp.status(200).json(result)
  })
  .catch(err=>{
    resp.status(500).json({error:err})
  })
}


module.exports = {postVacancy , getVacancy , delVacancy , getVacancyByInstitute}