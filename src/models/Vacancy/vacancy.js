const mongoose = require("mongoose");

const VacancySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  timming: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  about_company: {
    type: String,
    required: true,
  },
  about_job: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  institute_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  category:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model("VacancyModel", VacancySchema);
