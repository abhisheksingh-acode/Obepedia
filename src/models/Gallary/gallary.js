const mongoose = require('mongoose')

const GallarySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    files:{
        type: Array,
        required:true
    },
    institute_id:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('GallaryModel' , GallarySchema)