var map = L.map('map');

var mapControl = {
    curPos: [0,0],
    activeMarker: '',
    
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
    
    drawMarker: function(position) {
        
        if(mapControl.activeMarker !== '') {
            map.removeLayer(this.activeMarker);
            L.marker(this.activeMarker.getLatLng(), {icon: inactiveIcon}).addTo(map);
        } else {
            var answered = save_data.startQuiz();

            while(answered != save_data.nextQuiz().id) {
                L.marker([current_tour.points[answered].coords.lat, current_tour.points[answered].coords.lng], {icon: inactiveIcon}).addTo(map);
                answered = current_tour.points[answered].nextid;
            }
        }
        
        var newMarker = L.marker([position.lat, position.lng], {icon: activeIcon}).addTo(map)
            .bindPopup("Hier ist das nächste Rätsel", {'closeOnClick': false, 'closeButton': false}).openPopup();
    
        return newMarker;
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
            
        self.marker.click(function(){
            
        });

        self.circle = L.circle([position.coords.latitude, position.coords.longitude], radius).addTo(map);
        
        mapControl.activeMarker = mapControl.drawMarker(save_data.nextQuiz().coords, 'active');

        mapControl.centerMap();
    },
    
    onLocationUpdated: function (position) {
        map.removeLayer(self.marker);
        map.removeLayer(self.circle);
        
        dist = 71.5 * Math.pow((current_tour.points[key].coords.lng - mapControl.curPos[0]), 2);
        dist += 111.3 * Math.pow((current_tour.points[key].coords.lat - mapControl.curPos[1]), 2);
        dist = Math.sqrt(dist);

        if(dist <= 0.02) {
            save_data.enableNextQuiz();
            view.display.quiz();
        }

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

var inactiveIcon = L.icon({iconUrl: 'img/marker-inactive-quiz-icon.png'});
var activeIcon = L.icon({iconUrl: 'img/marker-active-quiz-icon.png'});