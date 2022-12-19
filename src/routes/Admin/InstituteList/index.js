const express = require("express");
const User = require("../../../models/signupmodel");
const InstiModel = require("../../../models/InstituteModel/institutemodel");


// Getting all Institute ( role:institute is deafult)
const getInsti = async (req, resp) => {
  const val =  req.body.role ? req.body.role : "institute"  ;
  User.find({ role: val })
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({
        Error: err,
      });
    });
};

// When admin want to see whole information of Institute
const getInstiDet = (req, resp) => {
    User.find({ _id: req.params.id })
      .then((result) => {
        InstiModel.find({ ref_id: req.params.id })
          .then((fulldet) => {
            Array.prototype.push.apply(result, fulldet);
            resp.status(200).json(result);
          })
          .catch((err) => {
            resp.status(500).json({
              Error: err,
            });
          });
      })
      .catch((err) => {
        resp.status(500).json({
          Error: err,
        });
      });
};

// If admin wants to delete Institute the  he just pass his id as params 
const delInsti = async (req, resp) => {
    User.findById({ _id: req.params.id })
      .remove()
      .then((result) => {
        resp.status(200).json({
          Value: "User Detated!",
          val2: result,
        });
      })
      .catch((err) => {
        resp.status(500).json({
          Error: err,
        });
      });
};

module.exports = {getInsti , getInstiDet  , delInsti}