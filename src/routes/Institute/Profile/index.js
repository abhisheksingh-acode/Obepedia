const express = require("express");
const mongoose = require("mongoose");
const instituteProfileModel = require("../../../models/Instituteprofile/instituteprofile");

// Adding profile Information
const postProfile = (req, resp) => {
  const { name, about, video, image, sliding_banner } = req.body;
  const Profile = new instituteProfileModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    about,
    video,
    image,
    sliding_banner
  })
    .save()
    .then((result) => {
      resp.status(200).json({ result });
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

// Getting profile Information
const getProfile = (req, resp) => {
  instituteProfileModel
    .find()
    .then((result) => {
      resp.status(200).json({ YourData: result });
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

// Deleting profile
const delProfile = (req, resp) => {
  instituteProfileModel
    .findOne({ _id: req.params.id })
    .deleteOne()
    .then((result) => {
      resp.status(200).json({ YourData: result });
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

module.exports = { postProfile, getProfile, delProfile };
