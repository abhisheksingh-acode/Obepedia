const express = require("express");
const mongoose = require("mongoose");
const SuggestionModel = require("../../../models/Suggestion_Form/suggestion_form");

// Adding faculty Information
const postSuggestion = async (req, resp) => {
  const { name, email, number, description } = req.body;
  const Suggestion = new SuggestionModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    number,
    description,
  }).save();

  const result = await Suggestion;
  resp.status(200).json({result, msg:'thank you for suggestion.'});
};

// Getting faculty Information
const getSuggestion = (req, resp) => {
  SuggestionModel.find()
    .then((result) => {
      resp.status(200).json(result);
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

module.exports = { postSuggestion, getSuggestion };
