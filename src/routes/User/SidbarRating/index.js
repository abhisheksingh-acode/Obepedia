const express = require("express");
const mongoose = require("mongoose");
const SidebarRatingModel = require("../../../models/SidebarRating/index");
// now import all required models

const postSidebarRating = async (req, resp) => {
  // const ref_id = req.params.id;

  const data = await SidebarRatingModel.findOne({ user_id: req.body.user_id });
  if (data) {
    await SidebarRatingModel.updateOne(
      { user_id: req.body.user_id },
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
    const result = await SidebarRatingModel.create({
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
    const newres = await result;
    resp.status(200).json(newres);
  }
};

const getSidebarRating = async (req, resp) => {
  try {
    const obj_id = req.params.id; //id of course or institute
    // const response = await SidebarRatingModel.find({ obj_id });

    let response = await SidebarRatingModel.aggregate([
      {
        $match: {
          obj_id: obj_id,
        },
      },
      {
        $group: {
          _id: "$obj_id",
          rating: { $avg: "$overall" },
          totalRatingCount: { $count: {} },
        },
      },
    ]);

    let progressRating = [];

    for (let i = 10; i >= 1; i--) {
      var rating = await SidebarRatingModel.find({
        obj_id,
        overall: i,
      }).countDocuments();
      progressRating.push({
        label: i,
        count: rating,
        percent: (rating * 100) / 10,
      });
    }

    return resp.status(200).json({ ratingAvg: response[0], progressRating });
  } catch (error) {
    resp.status(500).json("something went wrong");
  }
};

const detSiderating = async (req, resp) => {
  const data = await SidebarRatingModel.findOne({
    object_id: req.params.id,
  }).deleteMany();
  resp.status(200).json(data);
};

module.exports = { postSidebarRating, getSidebarRating, detSiderating };
