const express = require("express");
const SidebarModel = require("../../../models/Sidebar/sidebar");
const mongoose = require("mongoose");

const postSidebar = async (req, resp) => {
  const checkIfExist = await SidebarModel.findOne();

  if (checkIfExist) {
    await SidebarModel.findOne(req.params.id).updateOne({
      ...req.body,
    });

    return resp.status(200).json({ msg: "sidebar updates successfull" });
  }

  const Sidebar = await SidebarModel.create(req.body);
  return resp
    .status(200)
    .json({ result: Sidebar, msg: "sidebar uploads successfull" });
};

const getSidebar = async (req, resp) => {
  const result = await SidebarModel.findOne();
  return resp.status(200).json(result);
};

module.exports = { getSidebar, postSidebar };
