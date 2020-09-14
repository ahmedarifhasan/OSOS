const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    coordinates: {
        type: Array,
    },
    // GeoJson object for performing $near operator with coordinates of this object as center of $near
    geojson: {
        type: {
            type: String
        },
        coordinates: []
    },
    // Orders of this user
    orders: [{
        type: Object
    }]

})

module.exports = mongoose.model('user', userSchema)