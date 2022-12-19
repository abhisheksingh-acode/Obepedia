const express = require("express");
const SidebarModel = require("../../../models/Sidebar/sidebar");
const mongoose = require('mongoose')

const postSidebar = (req, resp) => {
  const { link, banner } = req.body;
  const Sidebar = new SidebarModel({
    _id: new mongoose.Types.ObjectId(),
    link,
    banner,
  })
    .save()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

const getSidebar =  (req, resp) => {
  SidebarModel.find()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

module.exports = { getSidebar , postSidebar};
