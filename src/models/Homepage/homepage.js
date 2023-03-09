const mongoose = require('mongoose');

const HomepageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    heading:{
        type:String,
        required:true,
    },
    aim:{
        type:String,
        required:true,
    },
    purpose:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('HomepageModel', HomepageSchema);  