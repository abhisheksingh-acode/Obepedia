const mongoose = require('mongoose')

const GallarySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    files:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('GallaryModel' , GallarySchema)