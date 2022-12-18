const express = require("express");
const mongoose = require("mongoose");
const facultyModel = require("../../../models/Faculty/faculty");

// Adding faculty Information
const postfaculty = (req, resp) => {
  const { name, description, subject , institute_id } = req.body;
  const faculty = new facultyModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    description,
    subject,
    institute_id : req.params.id
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
const getfaculty = (req, resp) => {
  const institute_id = req.params.id
  facultyModel.find({institute_id})
    .then((result) => {
      resp.status(200).json({ YourData: result });
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

// Deleting Faculty
const delfaculty = (req,resp)=>{
  facultyModel.findOne({_id:req.params.id})
  .deleteOne()
  .then(result=>{
    resp.status(200).json({YourData:result})
  })
  .catch(err=>{
    resp.status(500).json({error:err})
  })
}


module.exports = {postfaculty , getfaculty , delfaculty}