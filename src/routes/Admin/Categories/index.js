const express = require("express");
const mongoose = require("mongoose");
const CatergoriesModel = require("../../../models/Categories/categories");

const postCategory = (req, resp) => {
  const { category_name, icon, description, exam_prep, latest_update } =
    req.body;
  const NewCategory = new CatergoriesModel({
    _id: new mongoose.Types.ObjectId(),
    category_name,
    icon,
    description,
    exam_prep,
    latest_update
  })
    .save()
    .then((result) => {
      resp.status(200).json({ result });
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

const getCategoryName = (req, resp) => {
  CatergoriesModel.find()
    .then((result) => {
      // resp.status(200).json({ result });
      for (let i = 0; i < result.length; i++) {
        resp.json({name : result[i].name , id : result[i]._id})
      }
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

const getCategory = (req, resp) => {
  CatergoriesModel.find()
    .then((result) => {
      resp.status(200).json({ result });
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

const delCategory = (req,resp)=>{
    CatergoriesModel.findOne({_id:req.params.id})
    .remove()
    .then(result=>{
        resp.status(200).json({Message:result})
    })
    .catch(err=>{
        resp.status(500).json({Error:err})
    })
}

module.exports = { postCategory, getCategory , delCategory , getCategoryName };
