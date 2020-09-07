const mongoose = require('mongoose')

const deliveryguySchema = new mongoose.Schema({
    username : {
        type : String,
        required :true
    },
    password : {
        type : String,
        required : true
    },
    currentLocation :{
        type : []
    },
    lat : {
        type : Number
    },
    long : {
        type : Number
    },
    orderID : {
        type : Number
    }
})


module.exports = mongoose.model('deliveryguy',deliveryguySchema)