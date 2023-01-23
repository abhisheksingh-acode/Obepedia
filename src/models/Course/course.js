const mongoose = require("mongoose");
const CourseModel = require("../Categories/categories");
const CategoriesModel = require("../Categories/categories");

const CourseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  course: {
    type: String,
    required: true,
  },
  online: {
    type: Number,
    required: true,
  },
  offline: {
    type: Number,
    required: true,
  },
  medium: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  admit_card: {
    type: String,
    required: true,
  },
  results: {
    type: String,
    required: true,
  },
  application_form: {
    type: String,
    required: true,
  },
  dates: {
    type: String,
    required: true,
  },
  notification: {
    type: String,
    required: true,
  },
  preparation: {
    type: String,
    required: true,
  },
  pattern: {
    type: String,
    required: true,
  },
  institute_id: {
    type: String,
    required: true,
  },
  available: {
    type: String,
    required: [true, 'available field is missing']
  },
  subject: {
    type: String,
    required: [true, 'subject field is missing']
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "CategoriesModel",
    required: [true, 'category id is missing']
  },
  // Course Details Data
});

module.exports = mongoose.model("CourseModel", CourseSchema);
