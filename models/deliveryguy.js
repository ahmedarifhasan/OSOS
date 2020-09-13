const mongoose = require('mongoose')

const deliveryguySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    currentLocation: {
        type: []
    },
    lat: {
        type: Number
    },
    long: {
        type: Number
    },
    orders : {
        type : Object
    }
    ,
    orderID: {
        type: Number
    },
    deliveryID: {
        type: String
    },
    coordinates: {
        type: Array,
    },
    geojson: {
        type: {
            type: String
        },
        coordinates: []
    }
})


module.exports = mongoose.model('dguy', deliveryguySchema)