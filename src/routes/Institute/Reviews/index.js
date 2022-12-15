const express = require("express");
const mongoose = require("mongoose");
const User = require("../../../models/signupmodel");
const reviewsmodel = require("../../../models/Reviews/reviews");

// When admin want to see whole information of Institute
const getReview = (req, resp) => {
  User.find({ _id: req.params.id })
    .then(() => {
      reviewsmodel
        .find({ ref_id: req.params.id })
        .then((review) => {
          resp.status(200).json({
            Data: review,
          });
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

// Getting all reviews
const getAllReviews = (req, resp) => {
  reviewsmodel
    .find()
    .then((review) => {
      resp.status(200).json({
        Data: review,
      });
    })
    .catch((err) => {
      resp.status(500).json({
        Error: err,
      });
    });
};

// Delete a Review
const delReview = (req, resp) => {
  reviewsmodel
    .findOne({ _id: req.params.id })
    .deleteOne()
    .then((result) => {
      resp.status(200).json({ YourData: result });
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

module.exports = { getReview, delReview , getAllReviews };
