const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../../models/signupmodel");
const UserModel = require("../../../models/UserModel/usermodel");

// Adding  other information of User
const UserDet = async (req, resp) => {
  const user = await User.findOne({ _id: req.params.id });

  const userdet = new UserModel({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
    ref_id: req.params.id,
  }).save();

  const result = await userdet;

  return resp.status(200).json({ result, msg: "form submitted successfuly." });
};

const GetDet = (req, resp) => {
  UserModel.find({ ref_id: req.params.id }).then((res) => {
    resp.status(200).json(res);
  });
};

// const GetUserDet = (req, resp) => {
//   User.find({ _id: req.params.id })
//     .then((Primary_Data) => {
//       UserModel.find({ ref_id: req.params.id })
//         .then((Additional_Data) => {
//           resp.status(200).json({
//             Primary_Data,
//             Additional_Data,
//           });
//         })
//         .catch((err) => {
//           resp.status(500).json({
//             Error: err,
//           });
//         });
//     })
//     .catch((err) => {
//       resp.status(500).json({
//         Error: err,
//       });
//     });
// };

const GetUserDet = async (req, resp) => {
  const ifExist = await UserModel.find({ ref_id: req.params.id })
    .sort({ _id: -1 })
    .limit(1);

  if (!ifExist || ifExist.length == 0) {
    throw Error("Complete your profile.");
  }

  return resp.status(200).json(ifExist);
};

module.exports = { UserDet, GetUserDet, GetDet };
