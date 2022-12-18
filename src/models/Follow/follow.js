const mongoose = require('mongoose')

const FollowSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    institute_id:{
        type: String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('FollowModel' , FollowSchema)