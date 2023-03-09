const mongoose = require("mongoose");

const SaveVacancy = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  vacancy_id: {
    type: String,
    required: [true, "vacancy id is missing"],
  },
  user_id: {
    type: String,
    required: [true, "user id is missing"],
  },
});

module.exports = mongoose.model("SaveVacancy", SaveVacancy);
