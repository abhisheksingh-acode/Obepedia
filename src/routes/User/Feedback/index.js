const express = require("express");
const mongoose = require("mongoose");
const Feedback = require("../../../models/Feedback/Feedback");

// Adding faculty Information
const postFeedback = async (req, resp) => {
  const result = await Feedback.create(req.body);
  return resp.status(200).json({ result, msg: "thank you for feedback." });
};

module.exports = { postFeedback };
