const { response } = require("express");
const express = require("express");
const User = require("../../../models/signupmodel");
const UserModel = require("../../../models/UserModel/usermodel");

// Getting all users ( role:user is deafult)
const getUsers = async (req, resp) => {
  const val = req.body.role ? req.body.role : "user";
  const result = await User.find({ role: val }).sort({ _id: -1 });

  return resp.status(200).json(result);
};

// If admin wants to delete user the  he just pass his id as params
const delUsers = async (req, resp) => {
  await User.find({ _id: req.params.id }).deleteMany();

  return resp.status(200).json({ msg: "users deleted" });
};

const destroy = async (req, res) => {
  await User.deleteMany({ id: { $in: req.body.ids } });
  await UserModel.deleteMany({ ref_id: { $in: req.body.ids } });

  return req.status(200).json({msg: "delete operation is succeed"});
};

// When admin want to see whole information of user
const GetUserDet = (req, resp) => {
  User.find({ _id: req.params.id })
    .then((result) => {
      UserModel.find({ ref_id: req.params.id })
        .then((fulldet) => {
          // const arr = flat(result , fulldet)
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

module.exports = { getUsers, delUsers, GetUserDet, destroy };
