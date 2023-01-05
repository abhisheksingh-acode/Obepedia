// Now we are going to fetch ASll details of specific institute
const express = require("express");
const mongoose = require("mongoose");

// now import all required models
const InstituteProfileModel = require("../../../models/Instituteprofile/instituteprofile");

const Search = async (req, resp) => {
  try {
    let response = await InstituteProfileModel.find(
        {"$or": [
            {'name' : {$regex : req.params.key}},
            {'location' : {$regex : req.params.key}},
        ]}
    );
    let result = {response}
    resp.status(200).json(result)
  } catch (error) {
    resp.status(500).json(error)
  }
};



module.exports = { Search };