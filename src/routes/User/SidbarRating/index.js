const express = require("express");
const mongoose = require("mongoose");
const SidebarRatingModel = require("../../../models/SidebarRating/index");
// now import all required models


const postSidebarRating = async (req, resp) => {
  try {
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
      overall
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
      overall:val1+val2+val3+val4+val5+val6+val7+val8+val9+val10 
    });
    resp.status(200).json(result);
  } catch (error) {
    resp.status(500).json(error);
  }
};

const getSidebarRating = async (req,resp)=>{
    const obj_id = req.params.id //id of course or institute

    try {
        // const response = await SidebarRatingModel.find()
        //   .where({ obj_id })
        //   .select({ overall: 1 });
        // const finds = response.map((item) => {
        //   return item.overall;
        // });
        const response = await SidebarRatingModel.find({obj_id})
        resp.status(200).json(response);
      } catch (error) {
        
        resp.status(500).json(error);
      }

}

module.exports = { postSidebarRating , getSidebarRating };
