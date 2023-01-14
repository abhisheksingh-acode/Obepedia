const { response } = require("express");
const express = require("express");
const User = require("../../../models/signupmodel");
const UserModel = require("../../../models/UserModel/usermodel");

// Getting all users ( role:user is deafult)
const getUsers = async (req, resp) => {
  const val = req.body.role ? req.body.role : "user";
  User.find({ role: val })
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((err) => {
      resp.status(500).json({
        Error: err,
      });
    });
};

// If admin wants to delete user the  he just pass his id as params
const delUsers = async (req, resp) => {
  await User.find({ _id: req.params.id }).deleteMany();

  return resp.status(200).json({ msg: "users deleted" });
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

module.exports = { getUsers, delUsers, GetUserDet };
