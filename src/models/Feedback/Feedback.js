const mongoose = require("mongoose");

const FeedbackSchema = mongoose.Schema({
  subject: {
    type: String,
    required: [true, "subject is required"],
  },
  message: {
    type: String,
    required: [true, "message is required"],
  },
  file: {
    type: String,
  },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
