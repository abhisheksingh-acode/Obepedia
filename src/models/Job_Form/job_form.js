const mongoose = require("mongoose");

const Job_Form_Schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  vacancy_id:{
    type: mongoose.Types.ObjectId,
    ref: "VacancyModel",
    required: [true, 'vacancy id is missing']
  }
});

module.exports = mongoose.model("Job_Form_Model", Job_Form_Schema);
