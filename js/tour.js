app.save = {
	/**
	 * Gibt die ID des Tour zurück, für die die Speicherdaten angelegt wurden
	 * @return {Number|Boolean} Eine eindeutige ID der Tour oder false
	 */
	getTour: function() {
		return window.localStorage['tour'] || false;
	}

	/**
	 * Setzt die ID der Tour, für die die Speicherdaten angelegt werden
	 * @param {Number} id Eine eindeutge ID für die Tour
	 */
	setTour: function( id ) {
		window.localStorage['tour'] = id;
	}

	/**
	 * Gibt die ID des zuletzt beantworteten Rätsels zurück
	 * @return {Number|Boolean} Die ID des Rätsels oder false
	 */
	getLastAnswered: function() {
		return window.localStorage['lastA'] || false;
	},

	/**
	 * Setzt das zuletzt beantwortete Rätsel über seine ID
	 * @param {Number} id Die ID des Rätsels
	 */
	setLastAnswered: function( id ) {
		window.localStorage['lastA'] = id;
	},

	/**
	 * Gibt das Starträtsel zurück
	 * @Return {Number|Boolean}
	 */
	getStart: function() {
		return window.localStorage['startQ'] || false;
	},

	/**
	 * Setzt das Starträtsel
	 * @param {Number} id Die ID des Rätsels
	 */
	setStart: function( id ) {
		window.localStorage['startQ'] = id;
	},

	/**
	 * Fragt ab, ob das nächste Rätsel schon aktiviert wurde
	 * @returns {Boolean} true, wenn das nächste Rätsel aktiviert wurde
	 */
	nextEnabled: function() {
		return window.localStorage['nextQ'] ? true : false; 
	},

	/**
	 * Aktiviert das nächste Rätsel
	 */
	enableNext: function() {
		window.localStorage['nextQ'] = true;
	}

	/**
	 * Löscht alle Tourdaten
	 */
	deleteTourData: function() {
		delete window.localStorage['nextQ'];
		delete window.localStorage['lastA'];
		delete window.localStorage['startQ'];
	}

	/**
	 * Gibt die festgelegte Sprache zurück
	 * @return {String}
	 */
	getLang: function() {
		return window.localStorage['lang'] || 'de';
	}

	/**
	 * Setz die Sprache der der App auf einen Wert
	 * @param {String} lang Die Sprache
	 */
	setLang: function( lang ) {
		window.localStorage['lang'] = lang;
	}
};

function Tour( data ) {
	var self = this;

	this.id = data.id || 0;
	this.data = data;

	if ( app.save.getTour() !== this.data.id ) {
		app.save.delete();
	}

	this.currentQ = findStart();

	this.enableNext

	// TODO: Hier muss noch angepasst werden auf die neue Version von mapControl usw.
	/**
	 * Gibt das erste Rätsel zurück. Dabei wird entwerder auf die Savedata zurückgegriffen
	 * oder der nächste Punkt über die Geolocation gefunden.
	 * @return {Object}
	 */
	function findStart() {
		var dist, start;
		if ( !app.save.getStart() ) {
			start = {distance: Infinity, id: -1};
	        for (key in self.data.points) {
	            if (typeof key === 'undefined' || typeof key === 'function') {
	                continue;	            	
	            }
	            dist = Math.pow(111.3 * (self.data.points[key].coords.lat - mapControl.curPos[0]), 2);
	            dist += Math.pow(71.5 * (self.data.points[key].coords.lng - mapControl.curPos[1]), 2);
	            dist = Math.sqrt(dist);
	            if (dist < start.distance) {
	                start = {distance: dist, id: key};
	            }
	        }
	        return this.data.points[start.key];
		} else {
			return this.data.points[app.save.getStart()];
		}
	}
}