const mongoose = require("mongoose");

const SidebarSchema = mongoose.Schema({
  top_sidebar: {
    type: Object,
    required: true,
  },
  mid_sidebar: {
    type: Object,
    required: true,
  },
  bottom_sidebar: {
    type: Object,
    required: true,
  },
  page_banner: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("sidebarmodel", SidebarSchema);
