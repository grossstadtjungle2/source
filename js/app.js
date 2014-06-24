/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        mapControl.initialize();
    }
};

var current_tour = tour_data;

var save_data = {
    nextQuiz: function() {
        if (!window.localStorage.getItem('nextQ'))
            return false;
        return current_tour.points[this.lastAnswered().next];
    },
    lastAnswered: function() {
        return current_tour.points[window.localStorage.getItem('lastA')];
    },
    setLastAnswered: function(id) {
        return window.localStorage.setItem('lastA', id) &&
               window.localStorage.setItem('nextQ', false);
    },
    enableNextQuiz: function() {
        return window.localStorage.setItem('nextQ', true);
    }
};

/**
 * Erstellt eine Pupupabfrage um eine Aktion vom User bestätigen zu lassen
 * @param frage die Frage, die bestätigt werden soll
 * @param okaytext der Text, auf dem Okay Button
 * @param callback die Callbackfunktion, die beim Klick auf Okay ausgeführt wird
 */
var popup = function() {
    var $popup = $('#popup');
    var $abbrechenbutton = $('#popup > .button-double:first');
    var $okaybutton = $('#popup > .button-double:last');
    $abbrechenbutton.click(function() {
        $popup.hide();
    });
    return function(frage, buttons, callback) {
        if (typeof buttons === 'string') {
            var okaytext = buttons;
            var abbrechen = 'Abbrechen';
        } else {
            var okaytext = buttons[0];
            var abbrechen = buttons[1];
        }
        $popup.children('p').html(frage);
        $okaybutton.html(okaytext);
        $abbrechenbutton.html(abbrechen);
        $okaybutton.unbind();
        $okaybutton.click(function() {
            $popup.hide();
            callback();
        });
        $popup.show();
    };
}();

var menu = function() {
    var v = 300;
    var $this = $('#side-menu');
    var $screen = $('#app-frame');
    function ishorizontal() {
        return ($screen.width() - $screen.height()) > 0;
    }
    function hideme() {
        if (ishorizontal()) {
            $this.width($screen.width()*0.4);
            $this.animate({'left': -$screen.width()*0.4}, v);
            $screen.animate({'left': 0}, v);
        } else {
            $this.width($screen.width()*0.8);
            $this.animate({'left': -$screen.width()*0.8}, v);
            $screen.animate({'left': 0}, v);
        }
    }
    function showme() {
        if (ishorizontal()) {
            $this.width($screen.width()*0.4);
            $this.animate({'left': 0}, v);
            $screen.animate({'left': $screen.width()*0.4}, v);
        } else {
            $this.width($screen.width()*0.8);
            $this.animate({'left': 0}, v);
            $screen.animate({'left': $screen.width()*0.8}, v);
        }
    }
    function amShown() {
        return $this.css('left') === '0px';
    }
    return {hide: hideme, show: showme, isShown: amShown};
}();

var display_map = function() {
    $('#text-cont').addClass('hide');
    $('#interaction-bar').addClass('hide');
    $('#map').removeClass('hide');
    $('#side-menu .back').addClass('back2quiz').removeClass('back2map').text('Zurück zum Rätsel');
};

var display_content = function(cont) {
    cont && $('#text-cont').html(cont);
    $('#map').addClass('hide');
    $('#text-cont').removeClass('hide');
    $('#interaction-bar').removeClass('hide');
};

var display_quiz = function(id) {
    // Quick and dirty, da wir kein Exception Handling haben nur zum debuggen...
    var quiz;
    if (!current_tour)
        throw 'Es ist keine Tour ausgewählt!';
    if (!(quiz = current_tour.points[id]))
        throw 'Ein Rätsel mit dieser ID existiert in der ausgewählten Tour nicht!';
    var htm = '<h1>' + quiz.title + '</h1>';
    htm += '<p>' + quiz.intro + '</p>';
    htm += '<p>' + quiz.question + '</p>';
    htm += '<input id="answerField" type="text" placeholder="Antwort" />';
    htm += '<button type="button" onClick="checkAnswer(' + id + ')" class="button-single">Antwort überprüfen</button>';
    display_content(htm);
    
    $('#side-menu .back').addClass('back2map').removeClass('back2quiz').text('Zurück zur Karte');
};

var checkAnswer = function(id) {
    if (current_tour.points[id].solution === $('#answerField').val()) {
        mapControl.drawMarker({'lat': 49.4719216, 'lng': 8.5336204}, 'active');
        display_map();
    } else
        alert('Falsch. Versuch es nochmal. Vielleicht hilft dir der Tipp.');
};

// Menü triggern
$('#menu-click').click(function() {
    if (!menu.isShown()) {
        menu.show();
    }
});
$('#app-frame').click(function() {
    if (menu.isShown()) {
        menu.hide();
    }
});

// Menü Funktionen
$('.back').click(function(e) {
    e.preventDefault();
    menu.hide();
    
    $(e.currentTarget).hasClass('back2map') ? display_map() : display_quiz(save_data.nextQuiz().id || save_data.lastAnswered().id);
});
$('#impressum_click').click(function() {
    menu.hide();
    display_content('<h1>Impressum</h1><p>Diese App wurde von Studenten des Studiengangs Angewandte Informatik'+
                    ' Betriebliches Informationsmanagement Jahrgang 2013 im Rahmen der Projektmanagement'+
                    ' Vorlesung erstellt.</p>');
});