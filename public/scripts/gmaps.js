function curr(latitude, longitude) {

    console.log(latitude, longitude);
    latitude = Number(latitude)
    longitude = Number(longitude)

    let lati = latitude,
        long = longitude

    let map1 = document.getElementById("map"),
        map,
        mapZoom = 8


    // MAP CANVAS
    let mapCenter = {
        center: {
            lat: lati,
            lng: long
        },
        zoom: mapZoom
    }
    map = new google.maps.Map(document.getElementById("map"), mapCenter);



    // MARKER POSITION
    let markerPosition = {
        lat: lati,
        lng: long
    }
    var markerCenter = {
        markerPosition,
        map: map,
    }
    var marker = new google.maps.Marker({
        position: {
            lat: lati,
            lng: long
        },
        map: map
    });

}

function initMap() {
    let lati = 13.5,
        long = 78.7


    let map1 = document.getElementById("map"),
        map,
        mapZoom = 8


    // MAP CANVAS
    let mapCenter = {
        center: {
            lat: lati,
            lng: long
        },
        zoom: mapZoom
    }
    map = new google.maps.Map(document.getElementById("map"), mapCenter);



    // MARKER POSITION
    let markerPosition = {
        lat: lati,
        lng: long
    }
    var markerCenter = {
        markerPosition,
        map: map,
    }
    var marker = new google.maps.Marker({
        position: {
            lat: lati,
            lng: long
        },
        map: map
    });



    
}

  // function initMap() {
    //     let lati = 13.5,
    //         long = 78.7


    //     let map1 = document.getElementById("map"),
    //         map,
    //         mapZoom = 8


    //     // MAP CANVAS
    //     let mapCenter = {
    //         center: {
    //             lat: lati,
    //             lng: long
    //         },
    //         zoom: mapZoom
    //     }
    //     map = new google.maps.Map(document.getElementById("map"), mapCenter);



    //     // MARKER POSITION
    //     let markerPosition = {
    //         lat: lati,
    //         lng: long
    //     }
    //     var markerCenter = {
    //         markerPosition,
    //         map: map,
    //     }
    //     var marker = new google.maps.Marker({
    //         position: {
    //             lat: lati,
    //             lng: long
    //         },
    //         map: map
    //     });




    //     let button = document.getElementById("button")
    //     button.addEventListener("click", () => {
    //         if (map1.style.display == "none") {
    //             map1.style.display = "block"
    //         } else {
    //             map1.style.display = "none"
    //         }
    //     })
    // }