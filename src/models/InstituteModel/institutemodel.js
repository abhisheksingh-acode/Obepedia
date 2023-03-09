// its a signup model which is same for all(user,institute and admin)

const mongoose = require("mongoose");

const InstiModelSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  institute_name: {
    type: String,
    required: true,
  },
  located: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  about_institute: {
    type: String,
    required: true,
  },
  gallary: {
    type: String,
    required: true,
  },
  ref_id: {
    type: String,
  },
});

module.exports = mongoose.model("InstiModel", InstiModelSchema);
