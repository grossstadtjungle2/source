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
	getStart: function () {
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
	delete: function() {
		window.localStorage.clear();
	}
};

function Tour( data ) {
	var self = this;

	this.data = data;

	if ( app.save.getTour() !== this.data.id ) {
		app.save.delete();
	}


	function findStart() {
		if ( !app.save.getStart() ) {
			start = {distance: Infinity, id: -1};
	        for (key in this.data.points) {
	            if (typeof key === 'undefined' || typeof key === 'function') {
	                continue;	            	
	            }
	            dist = Math.pow(111.3 * (this.data.points[key].coords.lat - mapControl.curPos[0]), 2);
	            dist += Math.pow(71.5 * (this.data.points[key].coords.lng - mapControl.curPos[1]), 2);
	            dist = Math.sqrt(dist);
	            if (dist < start.distance)
	                start = {distance: dist, id: key};
	        }
		}
	}
}