// const express = require("express");
// const router = express.Router();
const User = require("../../../models/signupmodel");

const account = async (req, resp) => {
    
    const user = await User.findOne({_id:req.body.id});

    if(user){
        return resp.status(200).json({user})
    }
    else{
        return resp.status(500).json({msg:"user not found"})
    }
}

// module.exports = { account }
module.exports = account;
  