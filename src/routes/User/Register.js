const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/signupmodel");
const UserModel = require("../../models/UserModel/usermodel");
const jwt = require("jsonwebtoken");

const RegisterUser = async (req, resp) => {
  try {
    const body = req.body;
    const { name, email, mobile, password } = req.body;

    const createUser = await User.create({
      name,
      email,
      mobile,
      password: await bcrypt.hash(password, 10),
      role: "user",
    });

    if (createUser) {
      const registerDetails = await UserModel.create({
        ...body,
        username: name,
        email,
        number: mobile,
        ref_id: createUser._id,
      });

      if (registerDetails) {
        return resp.status(200).json({
          msg: "user created",
          user: registerDetails,
        });
      } else {
        await User.findOne({ _id: createUser._id }).deleteOne();
      }
    }
  } catch (error) {
    //  console.log(error);
    return resp
      .status(500)
      .json({ msg: "internal error", error: error.message });
  }
};

module.exports = { RegisterUser };
