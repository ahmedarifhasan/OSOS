// const express = require('express')
// const router = express.Router()
// const bodyParser = require('body-parser')


// const tt = require('@tomtom-international/web-sdk-services/dist/services-node.min.js');

// tt.services.copyrights({
//         key: 'h7Zirz3PBI0aDIrfq0UQlnOXm7HiB5kj'
//     })
//     .go()
//     .then(function (results) {
//         console.log('Copyrights', results);
//     })
//     .catch(function (reason) {
//         console.log('Copyrights', reason);
//     });

// const user = require('../models/user');
// const deliveryguy = require('../models/deliveryguy');




// router.get('/register', (req, res) => {
//     res.render('register')
// })

// router.post('/register', (req, res) => {
//     const {
//         username,
//         email,
//         password,
//     } = req.body

//     console.log(req.body);

//     var lat = req.body.latitude
//     var long = req.body.longitude
//     console.log(lat, long);
//     var coords = []
//     coords.push(lat)
//     coords.push(long)
//     console.log(lat, long, "<<<Lat,Long In register post>>>");
//     console.log(coords, "<<<Coords In register post>>>");
//     var new_user = new user({
//         username: username,
//         email: email,
//         password: password,
//         lat: lat,
//         long: long,
//         coordinates: coords
//     })

//     new_user.save((err, resi) => {
//         if (err) {
//             console.log(err, "<<<<>>>>");
//             res.status(401).send()
//         } else {
//             console.log("USER ADDED SUCCESSFULLY")
//             res.redirect('/login')
//         }
//     })
//     // user.findOne({
//     //     username: username
//     // }, (error, result) => {

//     // })
// })


// // <-- login GET and POST -->
// router.get('/login', (req, res) => {
//     res.render('login')
// })


// // API key : 2e36871d5b43683e7a31edf11112dd02

// router.get('/dashboard', (req, res) => {

//     deliveryguy.createIndexes({
//         geojson : "2dsphere"
//     })
//     user.createIndexes({
//         geojson : "2dsphere"
//     })
//     const filter = {
//         'geojson': {
//             '$near': {
//                 '$maxDistance': 10000000000,
//                 '$geometry': {
//                     'type': 'Point',
//                     'coordinates': [
//                         18,
//                         79
//                     ]
//                 }
//             }
//         }
//     };
//     // deliveryguy.find --> I have to display nearby Delivery guys
//     deliveryguy.find(
//         filter
//         // {
//         //     'geojson': {
//         //         '$geoWithin': {
//         //             '$centerSphere': [
//         //                 [18, 79.82302903], 100000000000000 / 3963.2
//         //             ]
//         //         }
//         //     }
//         // }

//         , (err, data) => {
//             if (err) {
//                 console.log("ERROR IN GIOWITHIN ->>" + err);
//             } else {
//                 console.log(data, "<<<In giowithin>>>");
//                 res.render('dashboard', {
//                     data: data
//                 })
//             }
//         })
// })

// router.post('/dashboard', (req, res) => {
//     res.redirect('/dashboard')
//     // user.aggregate(
//     //     [{
//     //         "$geonear": {
//     //             "near": {
//     //                 "type": "Point",
//     //                 // Find the closest point to this coordinates below
//     //                 "coordinates": [-73.99279, 40.719296]
//     //             },
//     //             "distaceField": "dis",
//     //             "spherical": true,
//     //         }
//     //     }],
//     //     (error, result) => {
//     //         if (error) {
//     //             res.status(401).send();
//     //             console.log(error)
//     //         } else {
//     //             console.log(result);
//     //             res.render('dashboard', {
//     //                 result: result
//     //             })
//     //         }

//     //     }
//     // )

// })

// router.post('/login', (req, res) => {

//     const username = req.body.username
//     const password = req.body.password

//     console.log(username, password, "<<>>")

//     console.log(req.body, "In Login");
//     user.findOne({
//         username: username,
//     }, (error, result) => {
//         if (error) {
//             console.error("User Not registered")
//             res.redirect('/user/register')
//         } else if (result.password === password) {
//             res.redirect('/user/dashboard')
//         } else {
//             console.error("Wrong Password")
//             res.redirect('/user/login')
//         }
//     })
// })

// // <-- Image Uploading -->


// module.exports = router


const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')


const tt = require('@tomtom-international/web-sdk-services/dist/services-node.min.js');

tt.services.copyrights({
    // TomTom API key
    key: 'h7Zirz3PBI0aDIrfq0UQlnOXm7HiB5kj'
});

const user = require('../models/user');
const {
    route
} = require('./deliveryGuyRouter');
const deliveryguy = require('../models/deliveryguy');


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
    coords.push(lat)
    coords.push(long)
    console.log(lat, long, "<<<Lat,Long In register post>>>");
    console.log(coords, "<<<Coords In register post>>>");
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

})


// <-- login GET and POST -->
router.get('/login', (req, res) => {
    res.render('login')
})


// API key : 2e36871d5b43683e7a31edf11112dd02

router.get('/dashboard/:id', (req, res) => {

    console.log(req.session.userid, req.params.id);
    if (!req.session.userid) {
        console.log("Login Failed");
        res.redirect('/user/login')
    }


    let userid = req.params.id
    console.log("userid at Server : ", userid ,typeof(userid));
    user.findById(userid, (err, userdata) => {
        console.log(userdata, "<< UserData >>");
        let coords = userdata.coordinates

        // Getting User Location, Passing User Co-ordinates to get nearest location , using 'Point' type

        const filter = {
            'geojson': {
                '$near': {
                    '$maxDistance': 10000000000,
                    '$geometry': {
                        'type': 'Point',
                        'coordinates': coords
                    }
                }
            }
        }

        // {
        //     'geojson': {
        //         '$geoWithin': {
        //             '$centerSphere': [
        //                 [18, 79.82302903], 100000000000000 / 3963.2
        //             ]
        //         }
        //     }
        // }

        if (err) {
            console.log("<< " + err + " >>");
            res.status(401).send();
        } else {

            deliveryguy.find(
                filter, (error, deliveryGuyData) => {
                    if (error) {
                        console.log("ERROR IN GIOWITHIN ->>" + error);
                        res.status(401).send()
                    } else {
                        console.log(deliveryGuyData, "\n<<<DeliveryGuyData in giowithin>>>");
                        res.render('dashboard', {
                            data: deliveryGuyData,
                            userdata: userdata
                        })
                    }
                })
        }
    })

})

router.post('/dashboard/:id', (req, res) => {
    console.log(req.body, "Dashboard on the Server");
    var lat = req.body.lat
    var lon = req.body.long
    lat = parseInt(lat)
    lon = parseInt(lon)
    var userid = req.params.id

    var updatedCoords = []
    updatedCoords.push(lon, lat)

    console.log(lat, lon);

    var updatedGeoJson = {
        type: "Point",
        coordinates: updatedCoords
    }



    console.log("finding user by id in POST", userid);
    // Update User Location in Database    
    user.findByIdAndUpdate(
        userid, {
            coordinates: updatedCoords,
            geojson: updatedGeoJson,
            lat: lat,
            long: lon
        }, (err, result) => {
            if (!err) {
                console.log("<<< " + result + " >>>");
                console.log("Updated User Location >>>" + userid);
            }

        }

    )


    if (!req.session.userid) {
        res.redirect('/user/login')
    } else
        res.redirect('/user/dashboard/' + req.params)

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


router.post('/dashboardu/:id', (req, res) => {
    console.log(req.body, "Dashboardu on the Server");
    var lat = req.body.lat
    var lon = req.body.long
    lat = parseInt(lat)
    lon = parseInt(lon)
    var userid = req.params.id

    var updatedCoords = []
    updatedCoords.push(lon, lat)

    console.log(lat, lon);

    var updatedGeoJson = {
        type: "Point",
        coordinates: updatedCoords
    }

    console.log("finding user by id in POST", userid);
    // Update User Location in Database    
    user.findByIdAndUpdate(
        userid, {
            coordinates: updatedCoords,
            geojson: updatedGeoJson,
            lat: lat,
            long: lon
        }, (err, result) => {
            if (!err) {
                console.log("<<< " + result + " >>>");
                console.log("Updated User Location >>>" + userid);
                res.send({ status : "success"})
            }

        }

    )
})

router.post('/dummyorder/:id',(req,res)=>{
    console.log(req.body);
    res.send({ status : "Successful Order Received"})
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
            res.redirect('/user/register')
        } else if (result.password === password) {
            req.session.userid = result._id
            console.log(req.session.userid);
            res.redirect('/user/dashboard/' + req.session.userid)
        } else {
            console.error("Wrong Password")
            res.redirect('/login')
        }
    })
})

// <-- Image Uploading -->

module.exports = router