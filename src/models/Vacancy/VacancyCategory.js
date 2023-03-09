const mongoose = require("mongoose");

const VacancyCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("VacancyCategory", VacancyCategorySchema);
