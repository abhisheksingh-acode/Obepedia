const express = require("express");
const mongoose = require("mongoose");

const User = require("../../../models/signupmodel");
const reviewsoncoursemodel = require("../../../models/Reviews/reviewsoncourse");
const reviewsoninstitutemodel = require("../../../models/Reviews/reviewsoninstitute");
const CourseModel = require("../../../models/Course/course");
const { parseZone } = require("moment");

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
const postReviewOnCourse = async (req, resp) => {
  // const user = await User.findOne({ _id: req.params.id });

  const postReviewOnCourse = new reviewsoncoursemodel({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  }).save();

  const result = await postReviewOnCourse;

  return resp.status(200).json(result);
};

// Getting All Reviews of  Course
const ReviewOnCourse = (req, resp) => {
  reviewsoncoursemodel
    .find({ course_id: req.params.id })

    .then((result) => {
      CourseModel.find({ _id: req.params.id })
        .then((val2) => {
          resp.status(200).json(result);
        })
        .catch((err) => {
          resp.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

// Getting all reviews of Course
const getAllReviewsOnCourse = (req, resp) => {
  reviewsoncoursemodel
    .find()
    .exec()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((error) => {
      resp.status(500).json({ err });
    });
};

////////////////////////////////////////////////

const postReviewOnInstitute = (req, resp) => {
  User.findOne({ _id: req.params.id }).then((val) => {
    const { name, desc, rating, ref_id, institute_id } = req.body;

    const postReviewOnInstitute = new reviewsoninstitutemodel({
      _id: new mongoose.Types.ObjectId(),
      name: val.name,
      desc,
      rating,
      ref_id: req.params.id,
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

const ReviewOnInstitute = async (req, resp) => {
  const institute = await User.findOne({ _id: req.params.id });

  reviewsoninstitutemodel
    .find({ institute_id: req.params.id })

    .then((result) => {
      User.find({ _id: req.params.id })
        .then((val2) => {
          resp.status(200).json({ result, institute });
        })
        // {name: val2[0].name , "no_of_comments" : result.length}
        .catch((err) => {
          resp.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

// Getting all reviews of Institute
const getAllReviewsOnInstitute = async (req, resp) => {
  // const result = await reviewsoninstitutemodel.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       foreignField: "_id",
  //       localField: "institute_id",
  //       as: "user",
  //     },
  //   },
  //   {

  //   },
  // ]);

  const result = await User.aggregate([
    {
      $lookup: {
        from: "reviewsoninstitutemodels",
        foreignField: "institute_id",
        localField: "_id",
        as: "reviews",
        pipeline: [
          {
            $group: {
              _id: "$institute_id",
              count: { $count: {} },
            },
          },
        ],
      },
    },
    {
      $match: { role: "institute" },
    },
  ]);

  return resp.status(200).json(result);
};

//////////////////////////////////////////////////////

// If admin wants to delete Institute the  he just pass his id as params
const deleteReview = (req, resp) => {
  reviewsmodel
    .findById({ _id: req.params.id })
    .deleteMany()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json(err);
    });
};

const ReviewByStudent = async (req, resp) => {
  const ref_id = req.params.id;
  try {
    const response = await reviewsoncoursemodel.find({ ref_id });
    const response2 = await reviewsoninstitutemodel.find({ ref_id });
    resp.status(200).json([...response, ...response2]);
  } catch (error) {
    resp.status(500).json(error);
  }
};

module.exports = {
  getAllReviewsOnCourse,
  getAllReviewsOnInstitute,
  deleteReview,
  ReviewOnInstitute,
  ReviewOnCourse,
  ReviewByStudent,
  postReviewOnCourse,
  postReviewOnInstitute,
};
