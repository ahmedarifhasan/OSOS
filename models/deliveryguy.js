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
    // Orders to be delivered by this user
    orders: [],
    // Unique Login ID for the Delivery Guy
    deliveryID: {
        type: String
    },
    // Coordinates , these can be updated live if feature added
    coordinates: {
        type: Array,
    },
    // geojson object for adding 2dsphere index to perform '$near' query
    geojson: {
        type: {
            type: String
        },
        coordinates: []
    }
})


module.exports = mongoose.model('dguy', deliveryguySchema)