const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

var jsAlert = require('js-alert')


const user = require('../models/user')




router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const {
        username,
        email,
        password,
    } = req.body

    console.log(req.body);

    var lat = req.body.latitude
    var long = req.body.longitude
    console.log(lat, long);
    var coords = []
    coords.push(lat, long)

    var new_user = new user({
        username: username,
        email: email,
        password: password,
        lat: lat,
        long: long,
        coordinates: coords
    })

    new_user.save((err, resi) => {
        if (err) {
            console.log(err, "<<<<>>>>");
            res.status(401).send()
        } else {
            console.log("USER ADDED SUCCESSFULLY")
            res.redirect('/login')
        }
    })
    // user.findOne({
    //     username: username
    // }, (error, result) => {

    // })


})


// <-- login GET and POST -->
router.get('/login', (req, res) => {
    res.render('login')
})


// API key : 2e36871d5b43683e7a31edf11112dd02

router.get('/dashboard', (req, res) => {

    // user.createIndexes({ location : "2dsphere" })
    user.find({
        'location': {
            '$geoWithin': {
                '$centerSphere': [
                    [73.93414657, 4.82302903], 1000000/3963.2
                ]
            }
        }
    } , (err,data)=>{
        if(err) {console.log("ERROR IN GIOWITHIN ->>" + err);}
        else{
            console.log( data, "In giowithin");
            res.render('dashboard', {
                data : data
            })
        }
    })
})

router.post('/dashboard', (req, res) => {
    res.redirect('/dashboard')
    const filter = {
        'location': {
          '$near': {
            '$maxDistance': 1000000, 
            '$geometry': {
              'type': 'Point', 
              'coordinates': [
                70.3, 3.5
              ]
            }
          }
        }
      };
      

  

    // user.aggregate(
    //     [{
    //         "$geonear": {
    //             "near": {
    //                 "type": "Point",
    //                 // Find the closest point to this coordinates below
    //                 "coordinates": [-73.99279, 40.719296]
    //             },
    //             "distaceField": "dis",
    //             "spherical": true,
    //         }
    //     }],
    //     (error, result) => {
    //         if (error) {
    //             res.status(401).send();
    //             console.log(error)
    //         } else {
    //             console.log(result);
    //             res.render('dashboard', {
    //                 result: result
    //             })
    //         }

    //     }
    // )

})

router.post('/login', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    // console.log(username , password)

    console.log(req.body, "In Login");
    user.findOne({
        username: username,
    }, (error, result) => {
        if (error) {
            console.error("User Not registered")
            res.redirect('/register')
        } else if (result.password == password) {
            res.render('dashboard', {
                name: result.name,
                email: result.email
            })
        } else {
            console.error("Wrong Password")
            res.redirect('/login')
        }
    })
})

// <-- Image Uploading -->







module.exports = router