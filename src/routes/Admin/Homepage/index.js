const express = require("express");
const mongoose = require('mongoose');
const HomepageModel = require("../../../models/Homepage/homepage");
const FaqModel = require("../../../models/Homepage/faq");

// Posting data of homepage module
const postHomepage = (req, resp) => {
  const { heading, aim, purpose, about } = req.body;

  const Homepage = new HomepageModel({
    _id: new mongoose.Types.ObjectId(),
    heading,
    aim,
    purpose,
    about
  })
    .save()
    .then((result) => {
      resp.status(200).json({ result });
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

// Getting data of homepage module
const getHomepage = (req, resp) => {
  HomepageModel
    .find()
    .then((result) => {
      resp.status(200).json({ result });
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

// Deleting Homepage Module
const deleteHomepage =  (req, resp) => {
  HomepageModel.findById({ _id: req.params.id })
    .deleteOne()
    .then((result) => {
      resp.status(200).json({
        Value: "Homepage Module Detated!",
        val2: result,
      });
    })
    .catch((err) => {
      resp.status(500).json({
        Error: err,
      });
    });
};

// FAQ CRUD OPERATION 

// Posting data of homepage module
const postFaq = (req, resp) => {
  const { question, answer } = req.body;

  const FaqPage = new FaqModel({
    _id: new mongoose.Types.ObjectId(),
    question,
    answer
  })
    .save()
    .then((result) => {
      resp.status(200).json({ result });
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

// Getting data of homepage module
const getFaq = (req, resp) => {
  FaqModel
    .find()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

// Deleting Homepage Module
const deleteFaq =  (req, resp) => {
  FaqModel.findById({ _id: req.params.id })
    .deleteOne()
    .then((result) => {
      resp.status(200).json({
        Value: "FAQ Detated!",
        val2: result,
      });
    })
    .catch((err) => {
      resp.status(500).json({
        Error: err,
      });
    });
};

module.exports = { postHomepage ,  getHomepage , deleteHomepage ,  postFaq , getFaq , deleteFaq};