const mongoose = require('mongoose')

const deliveryguySchema = new mongoose.Schema({
    name : {
        type : String,
        required :true
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
        type : {
            
        }
    }
})


module.exports = mongoose.model('deliveryguy',deliveryguySchema)