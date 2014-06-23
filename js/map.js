var map = L.map('map');
var marker, circle;

L.tileLayer('img/map/{z}/{x}/{y}.jpg', {
    minZoom: 18, // changed to 18 for debug because only zoom 18 exists (installls faster)
    maxZoom: 18
}).addTo(map);

var CenterMapControl = L.Control.extend({
    options: {
        position: 'bottomright'
    },

    onAdd: function (map) {
        // create the control container with a particular class name
        var container = L.DomUtil.create('div', 'center-map-control');

        L.DomUtil.create('div', 'leaflet-control center-text', container);
        L.DomEvent.addListener(container, 'click', function() {centerMap();});

        return container;
    }
});

map.addControl(new CenterMapControl());
$(".center-text").text("Zentrieren");

map.locate({setView: true});

navigator.geolocation.getCurrentPosition(onLocationFound, onLocationError);
var curPos = navigator.geolocation.watchPosition(onLocationUpdated);

function onLocationFound(position) {
    var radius = position.coords.accuracy / 2;

    marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point", {'closeOnClick': false, 'closeButton': false}).openPopup();

    circle = L.circle([position.coords.latitude, position.coords.longitude], radius).addTo(map);
    
    centerMap();
}
    
function onLocationUpdated (position) {
    map.removeLayer(marker);
    map.removeLayer(circle);
    
    onLocationFound(position);
}

function onLocationError(e) {
    alert(e.message);
}

function centerMap() {
    map.setView(marker.getLatLng());
}

function watchPosition() {
    curPos = navigator.geolocation.watchPosition(onLocationUpdated);
}

map.on('locationerror', onLocationError);

document.addEventListener("pause", function () {navigator.geolocation.clearWatch(curPos);}, false);

document.addEventListener("resume", function () {watchPosition();}, false);