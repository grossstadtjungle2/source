var map = L.map('map');

L.tileLayer('img/map/{z}/{x}/{y}.jpg', {
    minZoom: 15,
    maxZoom: 18
}).addTo(map);

navigator.geolocation.getCurrentPosition(onLocationFound, onLocationError);
navigator.geolocation.watchPosition(onLocationFound);

map.locate({setView: true});

function onLocationFound(position) {
    var radius = position.coords.accuracy / 2;

    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle([position.coords.latitude, position.coords.longitude], radius).addTo(map); /*49.4874359,8.4614417*/
}

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);