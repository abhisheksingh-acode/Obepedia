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
      overall:Number(val1)+Number(val2)+Number(val3)+Number(val4)+Number(val5)+Number(val6)+Number(val7)+Number(val8)+Number(val9)+Number(val10) 
    })
    const newres = await result.save()
    resp.status(200).json(newres);
  } catch (error) {
    resp.status(500).json(error);
  }
};

const getSidebarRating = async (req,resp)=>{
    const obj_id = req.params.id //id of course or institute

    try {
        const response = await SidebarRatingModel.find({obj_id})
        // const finds =  response.map((item) => {
        //  return   item.overall;
        // });
        // const value2 = await SidebarRatingModel.find({
        //   overall: { $in: finds },
        // });
        // avg = await finds.reduce((a, b) => a + b, 0)
        // resp.status(200).json(value2);
        resp.status(200).json(response);
      } catch (error) {
        
        resp.status(500).json(error);
      }

}

module.exports = { postSidebarRating , getSidebarRating };
