const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const InstituteProfileModel = require("../../../models/Instituteprofile/instituteprofile");
const User = require("../../../models/signupmodel");

// Adding  other information of User
const InstiDetails = async (req, resp) => {
  const findUser =  await User.findOne({ _id: req.params.id });
    // const {
    //   institute_name,
    //   located,
    //   state,
    //   address,
    //   rating,
    //   tags,
    //   about_institute,
    //   gallary,
    //   ref_id
    // } = req.body;

    const instidetails = new InstituteProfileModel({
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
      institute_id : req.params.id
    })
      .save()

    const result = await instidetails;

    resp.status(200).json({ newInsti: result });
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