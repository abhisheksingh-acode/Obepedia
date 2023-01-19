const express = require("express");
const mongoose = require("mongoose");
const GallaryModel = require("../../../models/Gallary/gallary");

// Adding Gallary Information
const postGallary = (req, resp) => {
  const { files , institute_id} = req.body;
  const Gallary = new GallaryModel({
    _id: new mongoose.Types.ObjectId(),
    files,
    institute_id : req.params.id
  })
    .save()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({ err });
    });
};

// Getting Gallary Information
const getGallary = (req, resp) => 
{
  const institute_id = req.params.id
  GallaryModel.find({institute_id})
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({ error: err });
    });
};

// Deleting Gallary
const delGallary = (req,resp)=>{
  GallaryModel.findOne({_id:req.params.id})
  .deleteOne()
  .then(result=>{
    resp.status(200).json(result)
  })
  .catch(err=>{
    resp.status(500).json({error:err})
  })
}


module.exports = {postGallary , getGallary , delGallary}