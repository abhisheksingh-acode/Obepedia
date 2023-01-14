const express = require("express");
const mongoose = require("mongoose");

const BookmarkModel = require("../../../models/Bookmark/bookmark");
const course = require("../../../models/Course/course");
const FollowModel = require("../../../models/Follow/follow");
const InstituteProfileModel = require("../../../models/Instituteprofile/instituteprofile");
const SaveVacancy = require("../../../models/Vacancy/SaveVacancy");
const VacancyModel = require("../../../models/Vacancy/vacancy");

// Saving or Bookmarking a Course
const postBookmark = async (req, resp) => {
  const ref_id = req.params.id;
  const { object_id, user_id } = req.body;
  const result1 = await BookmarkModel.findOne({ object_id });

  // return resp.json(req.body);
  if (result1) {
    await result1.deleteOne();
    return resp.status(200).json({ msg: `Your Course is Removed!` });
  } else {
    const Bookmark = new BookmarkModel({
      _id: new mongoose.Types.ObjectId(),
      object_id,
      user_id: ref_id,
    })
      .save()
      .then((result) => {
        resp
          .status(200)
          .json({ result, msg: `Your ${result.object_id} Course is Saved!` });
      })
      .catch((err) => {
        resp.status(500).json({ err });
      });
  }
};

const getBookmark = async (req, resp) => {
  const user_id = req.params.id;

  try {
    const value = await BookmarkModel.find()
      .where({ user_id })
      .select({ object_id: 1 });

    const finds = value.map((item) => {
      return item.object_id;
    });

    // return resp.status(200).json(finds);
    const value2 = await InstituteProfileModel.find({
      institute_id: { $in: finds },
    });
    resp.status(200).json(value2);
  } catch (error) {
    resp.status(200).json(error);
  }
};

// UnMark
const unMark = (req, resp) => {
  const _id = req.params.id;
  BookmarkModel.find({ _id })
    .deleteOne()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((error) => {
      resp.status(500).json({ error });
    });
};

// Follow Request
const postFollow = async (req, resp) => {
  const user_id = req.params.id;
  const { institute_id } = req.body;

  const isFollowed = await FollowModel.findOne({
    institute_id,
    user_id,
  });

  if (isFollowed) {
    await isFollowed.deleteOne();
    return resp.status(200).json({ msg: `Institute is saved` });
  }

  const Follow = new FollowModel({
    _id: new mongoose.Types.ObjectId(),
    institute_id,
    user_id: req.params.id,
  }).save();

  const result = await Follow;
  return resp.status(200).json({ result, msg: `Institute is saved!!` });
};

// Getting Followed list
const getFollow = async (req, resp) => {
  const user_id = req.params.id;
  try {
    const response = await FollowModel.find()
      .where({ user_id })
      .select({ institute_id: 1 });
    const finds = response.map((item) => {
      return item.institute_id;
    });
    const value2 = await InstituteProfileModel.find({
      institute_id: { $in: finds },
    });
    resp.status(200).json(value2);
  } catch (error) {
    resp.status(200).json(error);
  }
};

const postSaveVacancy = async (req, resp) => {
  const user_id = req.params.id;
  const { vacancy_id } = req.body;

  const isFollowed = await SaveVacancy.findOne({
    vacancy_id,
    user_id,
  });

  if (isFollowed) {
    await isFollowed.deleteOne();
    return resp.status(200).json({ msg: `vacancy_id is unsaved` });
  }

  const Follow = new SaveVacancy({
    _id: new mongoose.Types.ObjectId(),
    vacancy_id,
    user_id: req.params.id,
  }).save();

  const result = await Follow;
  return resp.status(200).json({ result, msg: `Vacancy is saved!!` });
};

// Getting Followed list
const getSaveVacancy = async (req, resp) => {
  const user_id = req.params.id;
  const response = await SaveVacancy.find()
    .where({ user_id })
    .select({ vacancy_id: 1 });
  const finds = response.map((item) => {
    return item.vacancy_id;
  });
  const value2 = await VacancyModel.find({
    _id: { $in: finds },
  });
  resp.status(200).json(value2);
};

const unFollow = (req, resp) => {
  const _id = req.params.id;
  FollowModel.find({ _id })
    .deleteOne()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((error) => {
      resp.status(500).json({ error });
    });
};

const getSavedCourses = async (req, resp) => {
  const user_id = req.params.id;

  try {
    const value = await BookmarkModel.find()
      .where({ user_id })
      .select({ object_id: 1 });

    const finds = value.map((item) => {
      return item.object_id;
    });

    // return resp.status(200).json(finds);
    const value2 = await course.find({
      _id: { $in: finds },
    });
    resp.status(200).json(value2);
  } catch (error) {
    resp.status(200).json(error);
  }
};

module.exports = {
  postBookmark,
  getBookmark,
  unMark,
  postFollow,
  getFollow,
  unFollow,
  getSavedCourses,
  postSaveVacancy,
  getSaveVacancy
};
