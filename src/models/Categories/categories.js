const mongoose = require("mongoose");

const CategoriesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category_name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  syllabus: {
    type: String,
  },
  icon: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  exam_prep: {
    type: String,
    required: true,
  },
  latest_update: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
  },
  subjects: {
    type: Array,
    required: [true, "please provide subjects for this exam"],
  },
});

module.exports = mongoose.model("CategoriesModel", CategoriesSchema);
