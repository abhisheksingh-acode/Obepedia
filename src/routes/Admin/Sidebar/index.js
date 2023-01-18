const express = require("express");
const SidebarModel = require("../../../models/Sidebar/sidebar");
const mongoose = require("mongoose");

const postSidebar = async (req, resp) => {
  const { link, banner } = req.body;
  const Sidebar = await SidebarModel.insertMany(req.body);

  resp.status(200).json({result : Sidebar});
};

const getSidebar = (req, resp) => {
  SidebarModel.find()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

module.exports = { getSidebar, postSidebar };
