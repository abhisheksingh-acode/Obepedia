const express = require("express");
const mongoose = require("mongoose");

const BookmarkModel = require("../../../models/Bookmark/bookmark");
const FollowModel = require("../../../models/Follow/follow");

// Saving or Bookmarking a Course
const postBookmark = (req, resp) => {
  const ref_id = req.params.id;
  const { object_id, user_id } = req.body;
  const Bookmark = new BookmarkModel({
    _id: new mongoose.Types.ObjectId(),
    object_id,
    user_id: ref_id,
  })
    .save()
    .then((result) => {
      resp
        .status(200)
        .json({ result, msg: `Your ${result.name} Course is Saved!` });
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

// Getting the list of bookmark
const getBookmark = (req, resp) => {
  const user_id = req.params.id;
  BookmarkModel.find({ user_id })
    .then((result) => {
      resp.status(200).json({ result, msg: `Here is  your Bookmarked list` });
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

// UnMark 
const unMark = (req, resp) => {
  const _id = req.params.id;
  BookmarkModel.find({ _id })
    .deleteOne()
    .then((result) => {
      resp.status(200).json({ result });
    })
    .catch((error) => {
      resp.status(500).json({ error });
    });
};

// Follow Request
const postFollow = (req, resp) => {
  const ref_id = req.params.id;
  const { institute_id, user_id } = req.body;
  const Follow = new FollowModel({
    _id: new mongoose.Types.ObjectId(),
    institute_id,
    user_id: ref_id,
  })
    .save()
    .then((result) => {
      resp
        .status(200)
        .json({ result, msg: `You just followed ${result.name}!` });
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

// Getting Followed list
const getFollow = (req, resp) => {
  const user_id = req.params.id;
  FollowModel.find({ user_id })
    .then((result) => {
      resp
        .status(200)
        .json({ result, msg: `Here is  your Followed Institute list` });
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

const unFollow = (req, resp) => {
  const _id = req.params.id;
  FollowModel.find({ _id })
    .deleteOne()
    .then((result) => {
      resp.status(200).json({ result });
    })
    .catch((error) => {
      resp.status(500).json({ error });
    });
};

module.exports = { postBookmark, getBookmark, unMark , postFollow, getFollow , unFollow };
