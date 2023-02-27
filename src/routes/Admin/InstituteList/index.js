const express = require("express");
const User = require("../../../models/signupmodel");
const InstiModel = require("../../../models/InstituteModel/institutemodel");
const InstituteProfileModel = require("../../../models/Instituteprofile/instituteprofile");
const reviewsoncoursemodel = require("../../../models/Reviews/reviewsoncourse");
const reviewsoninstitutemodel = require("../../../models/Reviews/reviewsoninstitute");
const facultyModel = require("../../../models/Faculty/faculty");
const CourseModel = require("../../../models/Course/course");
const VacancyModel = require("../../../models/Vacancy/vacancy");
const GallaryModel = require("../../../models/Gallary/gallary");

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
    await GallaryModel.find({ institute_id: el }).deleteMany();
    await VacancyModel.find({ institute_id: el }).deleteMany();
    await CourseModel.find({ institute_id: el }).deleteMany();
    await facultyModel.find({ institute_id: el }).deleteMany();
    await reviewsoninstitutemodel.find({ institute_id: el }).deleteMany();
    await reviewsoncoursemodel.find({ institute_id: el }).deleteMany();
  });

  return res.status(200).json({ msg: "delete operation is succeed" });
};

const unfeatureInst = (req, res) => {
  req.body.ids.forEach(async (el, index) => {
    await InstituteProfileModel.findOne({ _id: el }).updateOne({
      featured: false,
    });
  });

  return res.status(200).json({ msg: "Selected institutes are unfeatured." });
};
const approveInsti = async (req, res) => {
  const result = await User.findOne({ _id: req.params.id });

  const update = await User.findOne({ _id: req.params.id }).updateOne({
    approved: !result.approved,
  });

  return res.status(200).json({
    msg: !result.approved
      ? "Institutes is approved"
      : "Institutes is disapproved",
  });
};

const getFeatured = async (req, res) => {
  const result = await InstituteProfileModel.find({ featured: true })
    .sort({
      featured_order: 1,
    })
    .select({ image: 0, sliding_banner: 0 });
  return res.status(200).json(result);
};

const changeFeaturedOrder = async (req, res) => {
  const result = await InstituteProfileModel.findOne({
    _id: req.params.id,
  }).updateOne({ featured_order: req.body.order });

  return res.status(200).json({ result, msg: "Institute order changed." });
};

const markFeatured = async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ _id: id });
  const institute = await InstituteProfileModel.findOne({ institute_id: id });

  if (institute.featured) {
    const result = await InstituteProfileModel.findOne({
      institute_id: id,
    }).updateOne({
      featured: false,
      featured_order: 0,
    });
    return res.status(200).json({ msg: "Unmarked as featured", result });
  }

  const result = await InstituteProfileModel.findOne({
    institute_id: id,
  }).updateOne({
    featured: true,
    featured_order: req.body.featured_order,
  });
  return res.status(200).json({ msg: "Marked as featured", result });
};

module.exports = {
  getInsti,
  getInstiDet,
  delInsti,
  destroyInst,
  markFeatured,
  getFeatured,
  changeFeaturedOrder,
  unfeatureInst,
  approveInsti,
};
