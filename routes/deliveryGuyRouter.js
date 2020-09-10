const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const deliveryguy = require('../models/deliveryguy')

router.get('/login', (req, res) => {
    res.render('dlogin')
})




router.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body
    console.log(req.body);

    deliveryguy.findOne({
            username: username
        },
        (err, data) => {
            if (err) {
                res.json({
                    "Error": "USER NOR REGISTERED"
                })
                setTimeout(() => {
                    res.render('dlogin')
                }, 2500)
            }
            if (data == null) {
                deliveryguy.findOne({
                        deliveryID: username
                    },

                    (error, dataa) => {
                        if (error) {
                            res.json({
                                "Error": "User Not Registered"
                            })
                            setTimeout(() => {
                                res.render('dregister')
                            }, 2500)
                        } else {
                            if (dataa.password === password) {
                                res.render('deliveryGuyDashboard', {
                                    data: dataa
                                })
                            }
                        }
                    })
            } else {


                if (data.password === password) {
                    res.render('deliveryGuyDashboard', {
                        data: data
                    })
                } else {
                    res.json({
                        "Error": "Wrong Paassword"
                    })
                    setTimeout(() => {
                        res.render('dlogin')
                    }, 2500)
                }
            }


        })
})

router.get('/register', (req, res) => {
    res.render('dregister')
})

router.post('/register', (req, res) => {
    console.log(req.body);
    const {
        username,
        email,
        password,
    } = req.body


    var lat = (req.body.latitude)
    var long = (req.body.longitude)
    console.log(lat, long);
    var coords = []
    coords.push(lat)
    coords.push(long)
    console.log(coords, "<<<Coords In dregister post>>>");

    var new_user = new deliveryguy({
        username: username,
        email: email,
        password: password,
        lat: lat,
        long: long,
        coordinates: coords,
        deliveryID: req.body.deliveryID
    })

    new_user.save((err, resi) => {
        if (err) {
            console.log(err, "<<<<>>>>");
            res.status(401).send()
        } else {
            console.log("USER ADDED SUCCESSFULLY")
            res.redirect('/delivery/login')
        }
    })


})















module.exports = router