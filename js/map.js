var map = L.map('map');

var mapControl = {
    initialize: function() {
        L.tileLayer('img/map/{z}/{x}/{y}.jpg', {
            minZoom: 15,
            maxZoom: 18
        }).addTo(map);
        
        map.locate({setView: true});
        
        map.addControl(new CenterMapControl());
        
        $(".center-text").text("Zentrieren");
        
        this.bindEvents();
    },
    
    bindEvents: function() {
        map.on('locationerror', onLocationError);

        document.addEventListener("pause", function () {navigator.geolocation.clearWatch(this.curPos);}, false);

        document.addEventListener("resume", function () {watchPosition();}, false);
    },

    onLocationFound: function(position) {
        this.radius = position.coords.accuracy / 2;

        this.marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point", {'closeOnClick': false, 'closeButton': false}).openPopup();

        this.circle = L.circle([position.coords.latitude, position.coords.longitude], radius).addTo(map);

        this.centerMap();
    },
    
    onLocationUpdated: function (position) {
        map.removeLayer(this.marker);
        map.removeLayer(this.circle);

        this.onLocationFound(position);
    },

    onLocationError: function(e) {
        alert(e.message);
    },

    centerMap: function() {
        map.setView(this.marker.getLatLng());
    },

    watchPosition: function() {
        this.curPos = navigator.geolocation.watchPosition(onLocationUpdated);
    }
};

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