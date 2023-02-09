const mongoose = require("mongoose");

const InstituteProfileSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sliding_banner: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  institute_id: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  featured_order: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model(
  "InstituteProfileModel",
  InstituteProfileSchema
);
