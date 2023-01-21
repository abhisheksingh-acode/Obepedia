const express = require("express");
const User = require("../../../models/signupmodel");
const InstiModel = require("../../../models/InstituteModel/institutemodel");
const InstituteProfileModel = require("../../../models/Instituteprofile/instituteprofile");

// Getting all Institute ( role:institute is deafult)
const getInsti = async (req, resp) => {
  const val = req.body.role ? req.body.role : "institute";
  const result = await User.find({ role: val }).sort({ _id: -1 });
  return resp.status(200).json(result);
};

// When admin want to see whole information of Institute
const getInstiDet = (req, resp) => {
  User.find({ _id: req.params.id })
    .then((result) => {
      InstiModel.find({ ref_id: req.params.id })
        .then((fulldet) => {
          Array.prototype.push.apply(result, fulldet);
          resp.status(200).json(result);
        })
        .catch((err) => {
          resp.status(500).json({
            Error: err,
          });
        });
    })
    .catch((err) => {
      resp.status(500).json({
        Error: err,
      });
    });
};

// If admin wants to delete Institute the  he just pass his id as params
const delInsti = async (req, resp) => {
  User.findById({ _id: req.params.id })
    .remove()
    .then((result) => {
      resp.status(200).json({
        Value: "User Detated!",
        val2: result,
      });
    })
    .catch((err) => {
      resp.status(500).json({
        Error: err,
      });
    });
};

const destroyInst = (req, res) => {
  req.body.ids.forEach(async (el, index) => {
    await User.findByIdAndDelete(el);
    await InstituteProfileModel.find({ institute_id: el }).deleteOne();
  });

  return res.status(200).json({ msg: "delete operation is succeed" });
};

const markFeatured = async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ _id: id });
  const institute = await InstituteProfileModel.find({ institute_id: id });

  if (institute.featured) {
    await InstituteProfileModel.find({ institute_id: id }).updateOne({
      featured: false,
    });
    return res.status(200).json({ msg: "Unmarked as featured" });
  }

  await InstituteProfileModel.find({ institute_id: id }).updateOne({
    featured: true,
  });
  return res.status(200).json({ msg: "Marked as featured" });
};

module.exports = { getInsti, getInstiDet, delInsti, destroyInst, markFeatured };
