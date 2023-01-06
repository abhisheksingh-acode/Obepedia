// Now we are going to fetch ASll details of specific institute
const express = require("express");
const mongoose = require("mongoose");
const course = require("../../../models/Course/course");

// now import all required models
const InstituteProfileModel = require("../../../models/Instituteprofile/instituteprofile");
const VacancyModel = require('../../../models/Vacancy/vacancy')


const Search = async (req, resp) => {
  try {
    let response = await InstituteProfileModel.find(
        {"$or": [
            {'name' : {$regex : req.params.key}},
            {'location' : {$regex : req.params.key}},
        ]}
    )
    let response2 = await  VacancyModel.find(
      {"$or": [
        {'name' : {$regex : req.params.key}},
        {'responsibilities' : {$regex : req.params.key}},
        {'skills' : {$regex : req.params.key}},
        {'company' : {$regex : req.params.key}},
        {'location' : {$regex : req.params.key}},
        {'timming' : {$regex : req.params.key}},
    ]}
    )
    let response3 = await  course.find(
      {"$or": [
        {'course' : {$regex : req.params.key}},
        {'offline' : {$regex : req.params.key}},
        {'online' : {$regex : req.params.key}},
        {'medium' : {$regex : req.params.key}},
        {'duration' : {$regex : req.params.key}}
    ]}
    )

    let result = {institute: response , vacancy : response2 , course : response3 }
    resp.status(200).json(result)
  } catch (error) {
    resp.status(500).json(error)
  }
};


// const OverallSearch = async (req,resp)=>{
//   try {
//     let response = await InstituteProfileModel.find(
//       {"$or": [
//           {'name' : {$regex : req.params.key}},
//           {'location' : {$regex : req.params.key}}
//       ]}
//   );
//   let result = {response}
//   } catch (error) {
//     resp.status(500).json(error)
//   }
// }

module.exports = { Search };