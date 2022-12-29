const express = require("express");
const mongoose = require("mongoose");

const User = require("../../../models/signupmodel");
const reviewsmodel = require("../../../models/Reviews/reviews");


// Posting Reviews
const postReview = (req, resp) => {
  User.findOne({ _id: req.params.id }).then((val) => {

    const { name, desc, rating, ref_id ,course_id,
      institute_id } = req.body;

    const review = new reviewsmodel({
      _id: new mongoose.Types.ObjectId(),
      name: val.username,
      desc,
      rating,
      ref_id: req.params.id, // Referencing student
      course_id,
      institute_id
    })
      .save()

      .then((result) => {
        console.log(result);
        resp.status(200).json(result);
      })

      .catch((err) => {
        console.log(err);
        resp.status(500).json({ error: err });
      });
  });
};

module.exports = {postReview}