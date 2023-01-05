const express = require("express");
const mongoose = require("mongoose");
const SidebarRatingModel = require("../../../models/SidebarRating/index");
// now import all required models

const postSidebarRating = async (req, resp) => {
  // const ref_id = req.params.id;
  const data = await SidebarRatingModel.findOne({ user_id: req.params.id });
  if (data) {
    await SidebarRatingModel.updateOne(
      { user_id: req.params.id },
      {
        $set: req.body,
      }
    );
    return resp.status(200).json("Updated!");
  } else {
    const {
      val1,
      val2,
      val3,
      val4,
      val5,
      val6,
      val7,
      val8,
      val9,
      val10,
      obj_id,
      user_id,
      overall,
    } = req.body;
    const result = await new SidebarRatingModel({
      _id: new mongoose.Types.ObjectId(),
      val1,
      val2,
      val3,
      val4,
      val5,
      val6,
      val7,
      val8,
      val9,
      val10,
      obj_id,
      user_id,
      overall:
        Number(val1) +
        Number(val2) +
        Number(val3) +
        Number(val4) +
        Number(val5) +
        Number(val6) +
        Number(val7) +
        Number(val8) +
        Number(val9) +
        Number(val10),
    });
    const newres = await result.save();
    resp.status(200).json(newres);
  }
};

const getSidebarRating = async (req, resp) => {
  const obj_id = req.params.id; //id of course or institute

  try {
    const response = await SidebarRatingModel.find({ obj_id });
    resp.status(200).json(response);
  } catch (error) {
    resp.status(500).json(error);
  }
};

const detSiderating = async (req, resp) => {
  const data = await SidebarRatingModel.findOne({object_id:req.params.id}).deleteMany()
  resp.status(200).json(data)
};

module.exports = { postSidebarRating, getSidebarRating , detSiderating };
