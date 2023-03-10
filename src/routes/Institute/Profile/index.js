const express = require("express");
const mongoose = require("mongoose");
const instituteProfileModel = require("../../../models/Instituteprofile/instituteprofile");

// Adding profile Information
const postProfile = (req, resp) => {
  const {
    name,
    about,
    video,
    image,
    city,
    sliding_banner,
    location,
    institute_id,
  } = req.body;
  const Profile = new instituteProfileModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    about,
    video,
    image,
    sliding_banner,
    city,
    location,
    institute_id: req.params.id,
  })
    .save()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

// Getting profile Information
const getProfile = (req, resp) => {
  const institute_id = req.params.id;
  instituteProfileModel
    .find({ institute_id })
    .then((result) => {
      resp.status(200).json(result);
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
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

const putProfile = async (req, resp) => {
  const result = await instituteProfileModel
    .findOne({ institute_id: req.params.id })
    .updateOne({ ...req.body });

  return resp.status(200).json(result);
};

module.exports = { postProfile, getProfile, delProfile, putProfile };
