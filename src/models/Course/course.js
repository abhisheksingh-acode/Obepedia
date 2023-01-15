const mongoose = require("mongoose");
const CourseModel = require("../Categories/categories")

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
  institute_id: {
    type: String,
    required: true,
  },
  category_id: {
    type: mongoose.Types.ObjectId,
    ref: "CourseModel",
    required: [true, 'category id is missing']
  },
  // Course Details Data
});

module.exports = mongoose.model("CourseModel", CourseSchema);
