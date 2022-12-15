const express = require("express");
const mongoose = require("mongoose");

const User = require("../../../models/signupmodel");
const reviewsmodel = require("../../../models/Reviews/reviews");

// Getting all Reviews ( role:institute is deafult)
// const getReviews = async (req, resp) => {
//   reviewsmodel.find()
//     .then((result) => {
//       resp.status(200).json({
//         Reviews: result,
//       });
//     })
//     .catch((err) => {
//       resp.status(500).json({
//         Error: err,
//       });
//     });
// };

// Posting Reviews
const postReview = (req, resp) => {
  User.findOne({ _id: req.params.id }).then((val) => {
    const { name, desc, rating, ref_id, course_id, institute_id } = req.body;

    const review = new reviewsmodel({
      _id: new mongoose.Types.ObjectId(),
      name: val.name,
      desc,
      rating,
      ref_id: req.params.id,
      course_id,
      institute_id,
    })
      .save()

      .then((result) => {
        console.log(result);
        resp.status(200).json({ review: result });
      })

      .catch((err) => {
        console.log(err);
        resp.status(500).json({ error: err });
      });
  });
};

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

// If admin wants to delete Institute the  he just pass his id as params
const deleteReview = (req, resp) => {
  reviewsmodel
    .findById({ _id: req.params.id })
    .deleteMany()
    .then((result) => {
      resp.status(200).json({
        Value: "Review Detated!",
        val2: result,
      });
    })
    .catch((err) => {
      resp.status(500).json({
        Error: err,
      });
    });
};

// lIST OF INSTITUTES AND NUMBER OF REVIEWS ON IT
const InstituteReviews = (req, resp) => {
  User.find({ role: "institute" })
    .then((i) => {
      reviewsmodel
        .find({institute_id : i[0]._id})
        .then((result) => {
          resp
            .status(200)
            .json(
              {data: result}
            );
        })
        .catch((err) => {
          resp.status(500).json({ err });
        });
    })
    // .then(i=>{
    //   resp.status(200).json({data:i})
    // })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

module.exports = { postReview, getReview, deleteReview , InstituteReviews };
