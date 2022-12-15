const mongoose = require('mongoose')

const VacancySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        required:true
    },
    timming:{
        type: String,
        required:true
    },
    location:{
        type: String,
        required:true
    },
    about:{
        type: String,
        required:true
    },
    company:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('VacancyModel' , VacancySchema)