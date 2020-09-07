const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const deliveryguy = require('../models/deliveryguy')

router.get('/login', (req, res) => {
    res.send('login')
})

router.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body
    deliveryguy.findOne({
        username: username
    }, (err, data) => {
        if (err) {
            res.json({
                "Error": "User Not Registered"
            })
            setTimeout(() => {
                res.render('dregister')
            } , 4000)
        }
        if(data.password === password){
            res.render('deliveryGuyDashboard',{
                data : data
            })
        }
    })
})

module.exports = router