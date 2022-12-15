const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const InstiModel = require("../../../models/InstituteModel/institutemodel");
const User = require("../../../models/signupmodel");

// Adding  other information of User
const InstiDetails = (req, resp) => {
  User.findOne({ _id: req.params.id }).then(() => {
    const {
      institute_name,
      located,
      state,
      address,
      rating,
      tags,
      about_institute,
      gallary,
      ref_id
    } = req.body;

    const instidetails = new InstiModel({
      _id: new mongoose.Types.ObjectId(),
      institute_name,
      located,
      state,
      address,
      rating,
      tags,
      about_institute,
      gallary,
      ref_id: req.params.id
    })
      .save()

      .then((result) => {
        console.log(result);
        resp.status(200).json({ newInsti: result });
      })

      .catch((err) => {
        console.log(err);
        resp.status(500).json({ error: err });
      });
  });
};


const getInstiUsers = (req,resp)=>{
  User.findOne({role:req.body.role})
  .then(result=>{
    resp.status(200).json({YourData:result})
  })
  .catch(err=>{
    resp.status(500).json({error:err})
  })
} 



module.exports = {InstiDetails , getInstiUsers}