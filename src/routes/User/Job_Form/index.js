const express = require("express");
const mongoose = require("mongoose");
const Job_Form_Model = require("../../../models/Job_Form/job_form");

// Adding faculty Information
const postJobForm = (req, resp) => {
  const { name, email, number, resume, description } = req.body;
  const Job_Form = new Job_Form_Model({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    number,
    resume,
    description,
  })
    .save()
    .then((result) => {
      resp.status(200).json({ result });
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

// Getting faculty Information
const getJobForm = (req, resp) => {
    Job_Form_Model.find()
    .then((result) => {
      resp.status(200).json({ YourData: result });
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

// Deleting Faculty
// const delfaculty = (req,resp)=>{
//   facultyModel.findOne({_id:req.params.id})
//   .deleteOne()
//   .then(result=>{
//     resp.status(200).json({YourData:result})
//   })
//   .catch(err=>{
//     resp.status(500).json({error:err})
//   })
// }

module.exports = {  postJobForm, getJobForm };
