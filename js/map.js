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
        
        navigator.geolocation.getCurrentPosition(this.onLocationFound, this.onLocationError);
        //map.on('locationerror', this.onLocationError);
        //map.on('locationfound', this.onLocationFound);
    },
    
    bindEvents: function() {
        document.addEventListener("pause", function () {navigator.geolocation.clearWatch(this.curPos);}, false);
        document.addEventListener("resume", function () {watchPosition();}, false);
    },

    onLocationFound: function(position) {
        this.radius = position.coords.accuracy / 2;//position.accuracy / 2;

        this.marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map) //position.latlng
            .bindPopup("You are within " + this.radius + " meters from this point", {'closeOnClick': false, 'closeButton': false}).openPopup();

        this.circle = L.circle([position.coords.latitude, position.coords.longitude], this.radius).addTo(map); //position.latlng

        this.centerMap();
    },
    
    onLocationUpdated: function (position) {
        map.removeLayer(this.marker);
        map.removeLayer(this.circle);

        this.onLocationFound(position);
    },

    onLocationError: function(e) {
        alert(e.code + ", " + e.message); //for debug
        //alert("Wir konnten deine Position nicht finden. Bitte versuche es an einem neuen Standort nochmal."); //for live version
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
        L.DomEvent.addListener(container, 'click', function() {mapControl.centerMap();});

        return container;
    }
});