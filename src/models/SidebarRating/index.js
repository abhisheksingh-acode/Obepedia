const mongoose = require("mongoose");

const SidbarRatingModel = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  val1: {
    type: Number,
  },
  val2: {
    type: Number,
  },
  val3: {
    type: Number,
  },
  val4: {
    type: Number,
  },
  val5: {
    type: Number,
  },
  val6: {
    type: Number,
  },
  val7: {
    type: Number,
  },
  val8: {
    type: Number,
  },
  val9: {
    type: Number,
  },
  val10: {
    type: Number,
  },
  overall:{
    type:Number
  },
  obj_id:{ //object id of institute or course
    type: String,
    required: true,
  },
  user_id:{ //object id of institute or course
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("SidebarRatingModel", SidbarRatingModel);
