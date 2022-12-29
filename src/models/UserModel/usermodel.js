// its a signup model which is same for all(user,institute and admin)

const mongoose = require("mongoose");

const UserModelSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
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
  college: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
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
    type: Number,
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
  ref_id: {
    type: String,
  },
});

module.exports = mongoose.model("UserModel", UserModelSchema);
