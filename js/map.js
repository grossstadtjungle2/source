var map = L.map('map');

/**
 * Handlt FUnktionen rund um die Karte inkl. Standort
 * @type Object
 */
var mapControl = {
    curPos: [0,0],
    watchId: 0,
    activeMarker: '',
    myMarker: '',
    circle: '',
    
    /**
     * Initialisiert die Map
     */
    initialize: function() {
        L.tileLayer('img/map/{z}/{x}/{y}.jpg', {
            minZoom: 15,
            maxZoom: 18
        }).addTo(map);
        
        map.locate({setView: true});
        
        map.addControl(new CenterMapControl());
        
        this.bindEvents();
        //map.on('locationerror', this.onLocationError);
        //map.on('locationfound', this.onLocationFound);
    },
    
    /**
     * Eventlisteners initialisieren
     */
    bindEvents: function() {
        document.addEventListener("pause", function () {navigator.geolocation.clearWatch(this.watchId);}, false);
        document.addEventListener("resume", function () { mapControl.watchID = navigator.geolocation.watchPosition(this.onLocationUpdated, this.onWatchError, {maxAge: 5000, enableHighAccuracy: true}); }, false);
        this.watchId = navigator.geolocation.watchPosition(this.onLocationUpdated, this.onWatchError, {maxAge: 5000, enableHighAccuracy: true});
    },

    /**
     * Zentrieren der Map auf aktuellen Standort
     */
    centerMap: function() {
        if (mapControl.myMarker != '')
            map.setView(mapControl.myMarker.getLatLng());
    },
    
    /**
     * Setzen des Markers, der den Standort des aktuellen Rätsels zeigt
     */
    setActiveMarker: function() {
        this.activeMarker = this.drawMarker(save_data.nextQuiz().coords);
    },

    /**
     * Zeichnet Marker an gegebener Position
     * @param {LngLat} position Longitude(lng)- und Latitude(lat)-Werte in JSON-Format
     * @returns {Marker} GIbt zuletzt gemalten Marker zurück
     */
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
    
//    Funktion wird benötigt um zu überprüfen, ob für übergebene Position Kartenmaterial vorhanden ist
//    getTileURL: function(position, zoom) {
//        var xtile = parseInt(Math.floor((position.coords.longitude + 180) / 360 * (1<<zoom)));
//        var ytile = parseInt(Math.floor((1 - Math.log(Math.tan(position.coords.latitude.toRad()) + 1 / Math.cos(position.coords.latitude.toRad())) / Math.PI) / 2 * (1<<zoom)));
//        
//        return "" + zoom + "/" + xtile + "/" + ytile;
//    },

    /**
     * Callbackfunktion, die aufgerufen wird, wenn der Standort lokalisiert werdne konnte
     * @param {LngLat} position Longitude(lng)- und Latitude(lat)-Werte in JSON-Format
     */
    onLocationFound: function(position) {
        
         // Kann am Nordpol zu unerwartetem Verhalten führen ;)
        var first_time = (this.curPos[0] === 0 && this.curPos[1] === 0);

        var radius = position.coords.accuracy / 2;
        this.curPos = [position.coords.latitude, position.coords.longitude];
        
        dist = Math.pow(111.3 * (save_data.nextQuiz().coords.lat - mapControl.curPos[0]), 2);
        dist += Math.pow(71.5 * (save_data.nextQuiz().coords.lng - mapControl.curPos[1]), 2);
        dist = Math.sqrt(dist);
        
        //map.removeLayer(this.myMarker);
        this.myMarker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
        
        if(first_time) {
            this.setActiveMarker();
            this.centerMap();
        }
        
        if (this.activeMarker != '')
            this.activeMarker.getPopup().setContent("Nächstes Rätsel: " + save_data.nextQuiz().title + ' (' + Math.floor(dist * 1000) + "m)");

        this.circle = L.circle([position.coords.latitude, position.coords.longitude], radius).addTo(map);

        if(dist <= 0.02 && !save_data.nextQuizRdy()) {
            save_data.enableNextQuiz();
            view.display.quiz();
        }
    },
    
    /**
     * Callbackfunktion, die aufgerufen wird, wenn beim aktualisieren des Standortes ein Fehler auftritt. Gibt eine Alert-Meldung aus
     */
    onWatchError: function() {
         alert(e.code + ", " + e.message);
    },
    
    /**
     * Callbackfunktion, die aufgerufen wird, wenn ein aktualisierter Standort vorhanden ist
     * @param {LngLat} position Longitude(lng)- und Latitude(lat)-Werte in JSON-Format
     */
    onLocationUpdated: function (position) {
        map.removeLayer(mapControl.myMarker);
        map.removeLayer(mapControl.circle);
        
        mapControl.onLocationFound(position);
        map.invalidateSize();
    },

    /**
     * Callbackfunktion, die aufgerufen wird, wenn beim ersten Suchen des Standortes ein Fehler auftritt. Gibt eine Alert-Meldung aus
     */
    onLocationError: function(e) {
        alert(e.code + ", " + e.message); //for debug
        //alert("Wir konnten deine Position nicht finden. Bitte versuche es an einem neuen Standort nochmal."); //for live version
    }
};

/**
 * Custom Control Button, der vom Control-Objekt erbt und eim Klicken die Map zentriert
 * @type lControl
 */
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

// Verschiedene Icons je nach Markertyp
var inactiveIcon = L.icon({iconUrl: 'img/marker-inactive-quiz-icon.png'});
var activeIcon = L.icon({iconUrl: 'img/marker-active-quiz-icon.png'});