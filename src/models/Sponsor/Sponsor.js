const mongoose = require("mongoose");

const SponsorSchema = mongoose.Schema({
  institute_id: {
    type: mongoose.Types.ObjectId,
    ref: "InstituteProfileModel",
    required: [true, "institute id is missing"],
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "CategoriesModel",
    required: [true, "category id is missing"],
  },
  order: {
    type: Number,
    required: true,
  },
  // Course Details Data
});

module.exports = mongoose.model("Sponsor", SponsorSchema);
