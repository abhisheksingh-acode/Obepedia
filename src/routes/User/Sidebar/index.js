// Now we are going to fetch ASll details of specific institute
const express = require("express");
const mongoose = require("mongoose");

// now import all required models
const InstituteProfileModel = require("../../../models/Instituteprofile/instituteprofile");

// Top 5 Institutes 
const TopInstitutes = async (req,resp)=>{
  try {
    const result = await InstituteProfileModel.find({approved: true})
    resp.status(500).json(result)
  } catch (error) {
    resp.status(500).json({error : error})
  }
}

module.exports = { TopInstitutes };