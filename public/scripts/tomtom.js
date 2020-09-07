// <!-- API TOMTOM -->
// <!-- h7Zirz3PBI0aDIrfq0UQlnOXm7HiB5kj -->


function createMarker(icon, position, color, popupText) {
    var markerElement = document.createElement('div');
    markerElement.className = 'marker';
    var markerContentElement = document.createElement('div');
    markerContentElement.className = 'marker-content';
    markerContentElement.style.backgroundColor = color;
    markerElement.appendChild(markerContentElement);
    var iconElement = document.createElement('div');
    iconElement.className = 'marker-icon';
    iconElement.style.backgroundImage =
        '/assets/' + icon ;
    markerContentElement.appendChild(iconElement);
    var popup = new tt.Popup({
        offset: 30
    }).setText(popupText);
    // add marker to map
    new tt.Marker({
            element: markerElement,
            anchor: 'bottom'
        })
        .setLngLat(position)
        .setPopup(popup)
        .addTo(map);
}
