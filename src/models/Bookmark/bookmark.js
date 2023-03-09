const mongoose = require('mongoose')

const BookmarkSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    object_id:{
        type: String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('BookmarkModel' , BookmarkSchema)