const express = require("express");
const mongoose = require("mongoose");

const User = require("../../../models/signupmodel");
const reviewsmodel = require("../../../models/Reviews/reviews");
const CourseModel = require('../../../models/Course/course')

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
        resp.status(200).json(result);
      })

      .catch((err) => {
        console.log(err);
        resp.status(500).json({ error: err });
      });
  });
};

// Getting all reviews
const getAllReview = (req, resp) => {
  reviewsmodel
    .find()
    .exec()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((error) => {
      resp.status(500).json({ err });
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

const ReviewOnInstitute = (req, resp) => {
  reviewsmodel
    .find({ institute_id: req.params.id })

    .then((result) => {
      User.find({ _id: req.params.id })
      .then(val2 => {resp.status(200).json(result)})
      // {name: val2[0].name , "no_of_comments" : result.length}
      .catch((err) => {
        resp.status(500).json({ error: err })
      })
    })
    .catch((err) => {
      resp.status(500).json({ error: err })
    });
};



const ReviewOnCourse = (req, resp) => {
    reviewsmodel.find({ course_id: req.params.id })

    .then((result) => {
      CourseModel.find({ _id: req.params.id })
      .then(val2 => {resp.status(200).json({course_name: val2[0].course , "no_of_comments" : result.length})})
      .catch((err) => {
        resp.status(500).json({ error: err })
      })
    })
    .catch((err) => {
      resp.status(500).json({ error: err })
    });
};

const ReviewByStudent = (req, resp) => {
  reviewsmodel.find({ ref_id: req.params.id })

  .then((result) => {
    User.find({ _id: req.params.id })
    .then(val2 => {resp.status(200).json({name: val2[0].name , "no_of_comments" : result.length})})
    .catch((err) => {
      resp.status(500).json({ error: err })
    })
  })
  .catch((err) => {
    resp.status(500).json({ error: err })
  });
};

module.exports = { postReview, getAllReview, deleteReview, ReviewOnInstitute , ReviewOnCourse , ReviewByStudent };
