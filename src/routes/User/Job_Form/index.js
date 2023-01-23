const express = require("express");
const mongoose = require("mongoose");
const Job_Form_Model = require("../../../models/Job_Form/job_form");

// Adding faculty Information
const postJobForm = async (req, resp) => {
  const Job_Form = new Job_Form_Model({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  }).save();

  const result = await Job_Form;
  resp.status(200).json({ result, msg: "Job application submitted." });
};

// Getting faculty Information
const getJobForm = (req, resp) => {
  Job_Form_Model.find()
    .then((result) => {
      return resp.status(200).json(result);
    })
    .catch((err) => {
      return resp.status(500).json({ error: err });
    });
};

const getJobFormByInstituteId = async (req, resp) => {
  const result = await Job_Form_Model.find({ institute_id: req.params.id }).sort({
    _id: -1,
  });
  return resp.status(200).json(result);
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

module.exports = { postJobForm, getJobForm, getJobFormByInstituteId };
