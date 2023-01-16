// its a signup model which is same for all(user,institute and admin)

const mongoose = require("mongoose");

const UserModelSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: [true, 'username is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'email should be unique'],
  },
  number: {
    type: Number,
    required: [true, 'number is required'],
    unique: [true, 'phone should be unique'],
  },
  college: {
    type: String,
    required: [true, 'college is required'],
  },
  school: {
    type: String,
    required: [true, 'school is required'],
  },
  address: {
    type: String,
    required: [true, 'address is required'],
  },
  photo: {
    type: String,
    required: [true, 'photo is required'],
  },
  age: {
    type: Number,
    required: [true, 'age is required'],
  },
  city: {
    type: String,
    required: [true, 'city is required'],
  },
  state: {
    type: String,
    required: [true, 'state is required'],
  },
  dob: {
    type: Number,
    required: [true, 'dob is required'],
  },
  stream: {
    type: String,
    required: [true, 'stream is required'],
  },
  major: {
    type: String,
    required: [true, 'major is required'],
  },
  ref_id: {
    type: String,
  },
});

module.exports = mongoose.model("UserModel", UserModelSchema);
