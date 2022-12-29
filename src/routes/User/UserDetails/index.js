const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserModel = require("../../../models/UserModel/usermodel");
const User = require("../../../models/signupmodel");

// Adding  other information of User
const UserDet = (req, resp) => {
  User.findOne({ _id: req.params.id }).then(() => {
    if (UserModel.find({ref_id:req.params.id})) {
      // resp.send('User details already send')
      var val = false
    }
    else{
      const {
        username,
        email,
        number,
        address,
        college,
        school,
        age,
        city,
        state,
        dob,
        stream,
        major,
        photo,
        ref_id,
      } = req.body;
      const userdet = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        username,
        email,
        number,
        address,
        college,
        school,
        age,
        city,
        state,
        dob,
        stream,
        major,
        photo,
        ref_id: req.params.id,
      })
        .save()
  
        .then((result) => {
          console.log(result);
          resp.status(200).json({ newUser: result });
        })
  
        .catch((err) => {
          console.log(err);
          resp.status(500).json({ error: err });
        });

        val = false
    }
  });
};

const GetDet  =  (req,resp)=>{
UserModel.find({ref_id:req.params.id})
.then((res)=>{
    resp.status(200).json(res)
})
}

const GetUserDet = (req, resp) => {
  User.find({ _id: req.params.id })
    .then((Primary_Data) => {
      UserModel.find({ ref_id: req.params.id })
        .then((Additional_Data) => {
          resp.status(200).json({
            Primary_Data,
            Additional_Data,
          });
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

module.exports = { UserDet , GetUserDet , GetDet };
