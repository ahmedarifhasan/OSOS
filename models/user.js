const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    lat : {
        type :Number ,
        required : true
    },
    long : {
        type : Number,
        required : true
    },
    coordinates : {
        type :Array,
        default : []
    },
    geojson : {
        type : Object,
        default : {
            location : {

            },
        }

    }

})

module.exports = mongoose.model('userr', userSchema)