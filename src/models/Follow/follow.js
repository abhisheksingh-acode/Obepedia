const mongoose = require('mongoose')

const FollowSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    institute_id:{
        type: mongoose.Types.ObjectId,
        ref : 'User',
        required:[true,'institute id is missing' ]
    },
    user_id:{
        type:String,
        required:[true,'user id is missing' ]
    }
})

module.exports = mongoose.model('FollowModel' , FollowSchema)