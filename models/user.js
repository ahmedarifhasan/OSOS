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
    geojson: {
        type: {
            type: String
        },
        coordinates : []
    }

})

module.exports = mongoose.model('user', userSchema)