// its a signup model which is same for all(user,institute and admin)

const mongoose = require("mongoose");

const UserModelSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  age: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  school_college: {
    type: String,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  school_college: {
    type: String,
    required: true,
  },
  ref_id: {
    type: String,
  },
});

module.exports = mongoose.model("UserModel", UserModelSchema);
