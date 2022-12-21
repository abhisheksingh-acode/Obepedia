const mongoose = require("mongoose");

const VacancyDetailsSchema = mongoose.Schema({
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
  company: {
    type: String,
    required: true,
  },
  company_banner: {
    type: String,
    required: true,
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
  vacancy_id: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("VacancyDetailsModel", VacancyDetailsSchema);
