const mongoose = require("mongoose");

const SidebarSchema = mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("sidebarmodel", SidebarSchema);
