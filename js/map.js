var map = L.map('map');

var mapControl = {
    curPos: [0,0],
    
    initialize: function() {
        L.tileLayer('img/map/{z}/{x}/{y}.jpg', {
            minZoom: 15,
            maxZoom: 18
        }).addTo(map);
        
        map.locate({setView: true});
        
        map.addControl(new CenterMapControl());
        
        this.bindEvents();
        
        navigator.geolocation.getCurrentPosition(this.onLocationFound, this.onLocationError);
        //map.on('locationerror', this.onLocationError);
        //map.on('locationfound', this.onLocationFound);
    },
    
    bindEvents: function() {
        document.addEventListener("pause", function () {navigator.geolocation.clearWatch(this.curPos);}, false);
        document.addEventListener("resume", function () {watchPosition();}, false);
    },

    centerMap: function() {
        map.setView(self.marker.getLatLng());
    },

    watchPosition: function() {
        this.curPos = navigator.geolocation.watchPosition(self.onLocationUpdated);
    },
    
    drawMarker: function(position, status) {
        var markerIcon;
        
        if (status === 'active') {
            markerIcon = L.icon({iconUrl: 'img/marker-active-quiz-icon.png'});
        } else {
            markerIcon = L.icon({iconUrl: 'img/marker-inactive-quiz-icon.png'});
        }
        
        var newSpot = L.marker([position.lat, position.lng], {icon: markerIcon}).addTo(map)
            .bindPopup("Hier ist das nächste Rätsel", {'closeOnClick': false, 'closeButton': false}).openPopup();
    
        return newSpot;
    },
    
    getTileURL: function(position, zoom) {
        var xtile = parseInt(Math.floor((position.coords.longitude + 180) / 360 * (1<<zoom)));
        var ytile = parseInt(Math.floor((1 - Math.log(Math.tan(position.coords.latitude.toRad()) + 1 / Math.cos(position.coords.latitude.toRad())) / Math.PI) / 2 * (1<<zoom)));
        
        return "" + zoom + "/" + xtile + "/" + ytile;
    },

    onLocationFound: function(position) {
        var radius = position.coords.accuracy / 2;

        self.marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point", {'closeOnClick': false, 'closeButton': false}).openPopup();

        self.circle = L.circle([position.coords.latitude, position.coords.longitude], radius).addTo(map);
        
        mapControl.drawMarker(save_data.nextQuiz().coords, 'active');

        mapControl.centerMap;
    },
    
    onLocationUpdated: function (position) {
        map.removeLayer(self.marker);
        map.removeLayer(self.circle);

        this.onLocationFound(position);
    },

    onLocationError: function(e) {
        alert(e.code + ", " + e.message); //for debug
        //alert("Wir konnten deine Position nicht finden. Bitte versuche es an einem neuen Standort nochmal."); //for live version
    }
};

var CenterMapControl = L.Control.extend({
    options: {
        position: 'bottomright'
    },

    onAdd: function (map) {
        // create the control container with a particular class name
        var container = L.DomUtil.create('div', 'leaflet-control-button');

        var button = L.DomUtil.create('div', 'leaflet-buttons-control-button', container);
        L.DomEvent.addListener(container, 'click', mapControl.centerMap);
        
        var icon = L.DomUtil.create('img', 'leaflet-buttons-control-img', button);
        icon.setAttribute('src', 'img/center-icon.png');

        return container;
    }
});