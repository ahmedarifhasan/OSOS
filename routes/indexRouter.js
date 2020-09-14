const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')


// Using TomTom Maps API for providing Map Interface
const tt = require('@tomtom-international/web-sdk-services/dist/services-node.min.js');

tt.services.copyrights({
    // TomTom API key
    key: 'h7Zirz3PBI0aDIrfq0UQlnOXm7HiB5kj'
});


// Importing Models
const user = require('../models/user');
const deliveryguy = require('../models/deliveryguy');

// <-- New User registration GET request  -->
router.get('/register', (req, res) => {
    res.render('register')
})


// <-- New User registration POST request -->
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


// <-- User login GET request -->
router.get('/login', (req, res) => {
    res.render('login')
})



// <-- User Login POST request -->
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
            // storing the current logged in userid into the session.userid 
            req.session.userid = result._id
            res.redirect('/user/dashboard/' + req.session.userid)
        } else {
            console.error("Wrong Password")
            res.redirect('/user/login')
        }
    })
})




// <-- User Dashboard GET request -->

router.get('/dashboard/:id', (req, res) => {

    if (!req.session.userid) {
        console.log("Login Failed");
        res.redirect('/user/login')
    }


    let userid = req.params.id
    console.log("userid at Server : ", userid, typeof (userid));
    user.findById(userid, (err, userdata) => {
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
        // <-- $geoWithin could also be used but $near looked simpler and less complex-->
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
                            userdata: userdata,
                            deliveryGuy: ""
                        })
                    }
                })
        }
    })

})


// <-- User Dashboard POST request -->
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
                res.send({
                    status: "success"
                })
            }

        }

    )
})



// <-- User Dummy Order POST request, received through ajax POST request here which is then used for updating the user orders in the user database and for finding the nearest delivery guy to the user using '$near' operator -->
router.post('/dummyorder/:id', (req, res) => {
    console.log(req.body);
    let productsOrdered = req.body.productID
    var userid = req.params.id

    // Updating User Orders
    user.findByIdAndUpdate(userid, {
        // Using '$push' operator to push the 'productsOrdered' onto the user's order database
        $push: {
            orders: productsOrdered
        }
    }, (err, result) => {
        if (err) {
            // res.send({
            //     status: "Error while passing customer order"
            // })
        }
        console.log(`Ordered Successfully for user with id : ${userid} , User Data -> ` + result);

        // assigning user location to a variable 
        var coords = result.coordinates

        const filter = {
            'geojson': {
                '$near': {
                    // This maxDistance can be changed to suit the needs
                    '$maxDistance': 10000000000,
                    '$geometry': {
                        'type': 'Point',
                        // the users coordinates are passed to as the coordinates in geometry
                        'coordinates': coords
                    }
                }
            }
        }

        // Finding the NEAREST delivery guy to pass the order onto
        deliveryguy.find(
            filter, (error, deliveryGuyData) => {
                if (error) {
                    console.log("ERROR IN GIOWITHIN IN DUMMYORDER->>" + error);
                    // res.status(401).send()
                } else {
                    console.log(deliveryGuyData[0], "\n<<<DeliveryGuyData in giowithin in dummyOrder>>>");
                    res.render('dashboard', {
                        data: deliveryGuyData,
                        userdata: result,
                    })
                }
                var newOrder = {
                    orderID: userid,
                    order: productsOrdered,
                    deliveryLocation: coords
                }
                console.log(newOrder, " << New Order >>");
                deliveryguy.findByIdAndUpdate(
                    deliveryGuyData[0]._id, {
                        // Using $push operator to pass the order to the NEAREST delivery guy
                        $push: {
                            orders: newOrder
                        }
                    }, (err, ress) => {
                        if (err) {
                            console.log("Error while updating order in Dguy ", err);
                        } else {
                            console.log("successfully updated dguy orders", ress);
                        }
                    })

            })
    })
})


// <-- Image Uploading -->

module.exports = router