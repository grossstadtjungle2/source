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
//mapControl.curPos = [50.489862, 8.465416];

var save_data = {
    nextQuizRdy: function() {
        if (!window.localStorage.getItem('nextQ'))
            return false;
        return this.nextQuiz();
    },
    nextQuiz: function() {
        return current_tour.points[this.lastAnswered().nextid];
    },
    lastAnswered: function() {
        if (!window.localStorage.getItem('lastA')) {
            return {id: -1, nextid: this.startQuiz()};
        }
        return current_tour.points[window.localStorage.getItem('lastA')];
    },
    setLastAnswered: function(id) {
        return window.localStorage.setItem('lastA', id) &&
               window.localStorage.setItem('nextQ', false);
    },
    enableNextQuiz: function() {
        return window.localStorage.setItem('nextQ', true);
    },
    startQuiz: function() {
        var start = window.localStorage.getItem('startQ');
        var dist;
        if (start)
            return start;
        // Start noch nicht gesetzt, finde nächsten Punkt
        
        start = {distance: Infinity, id: -1}
        for (key in current_tour.points) {
            if (typeof key === 'undefined' || typeof key === 'function')
                continue;
            dist = 71.5 * Math.pow((current_tour.points[key].coords.lng - mapControl.curPos[0]), 2);
            dist += 111.3 * Math.pow((current_tour.points[key].coords.lat - mapControl.curPos[1]), 2);
            dist = Math.sqrt(dist);
            if (dist < start.distance)
                start = {distance: dist, id: key};
        }
        window.localStorage.setItem('startQ', start.id);
        return start.id;
    },
    tourEnd: function() {
        window.localStorage.clear();
    }
};

/**
 * Erstellt eine Popupabfrage um eine Aktion vom User bestätigen zu lassen
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
        } else if (typeof buttons === 'undefined') {
            $abbrechenbutton.html('Okay');
            $okaybutton.hide();
            $abbrechenbutton.addClass('button-single').removeClass('button-double');
            $popup.show();
            $popup.children('p').html(frage);
            return;
        } else {
            var okaytext = buttons[0];
            var abbrechen = buttons[1];
        }
        $popup.children('p').html(frage);
        $okaybutton.html(okaytext);
        $abbrechenbutton.html(abbrechen);
        $abbrechenbutton.addClass('button-double').removeClass('button-single');
        $okaybutton.show();
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

var view = function() {
    var current_view = 'map';
    var $first_button = $('#interaction-bar > div:first');
    var $second_button = $('#interaction-bar > div:last');
    
    function display_map() {
        $('#text-cont').addClass('hide');
        $('#interaction-bar').addClass('hide');
        $('#map').removeClass('hide');
        $('#side-menu .back').addClass('back2quiz').removeClass('back2map').text('Zurück zum Rätsel');
        current_view = 'map';
        map.invalidateSize();
    };
    
    function display_content(cont, button, bcallback) {
        cont && $('#text-cont').html(cont);
        $('#map').addClass('hide');
        $('#text-cont').removeClass('hide');
        if (get_current() === 'map')
            $first_button.addClass('back2map').removeClass('back2quiz').text('Zurück zur Karte');
        else
            $first_button.addClass('back2quiz').removeClass('back2map').text('Zurück zum Rätsel');
        if (typeof button !== 'string' && typeof bcallback !== 'function') {
            $second_button.addClass('hide');
            $first_button.removeClass('button-double').addClass('button-single');
        } else {
            $second_button.removeClass('hide');
            $second_button.unbind();
            $second_button.click(bcallback);
            $second_button.html(button);
            $first_button.removeClass('button-single');
            $first_button.addClass('button-double');
        }
        $('#interaction-bar').removeClass('hide');
        $('#side-menu .back').addClass('back2map').removeClass('back2quiz').text('Zurück zum Karte');
        current_view = 'content';
    };
    
    function display_quiz(input) {
        var quiz = quiz_by_input(input);
        var htm = '<h1>' + quiz.title + '</h1>';
        htm += '<p>' + quiz.intro + '</p>';
        htm += '<p>' + quiz.question + '</p>';
        htm += '<input id="answerField" type="text" placeholder="Antwort" />';
        htm += '<button type="button" onClick="quizzes.checkAnswer()" class="button-single">Antwort überprüfen</button>';
        view.display.content(htm, 'Rätsel überspringen', function() { popup('Wollen sie das Rätsel wirklich überspringen?', 'Überspringen', quizzes.skip) });
        
        $('#side-menu .back').addClass('back2map').removeClass('back2quiz').text('Zurück zur Karte');
    }
    
    function display_tipp(input) {
        var quiz = quiz_by_input(input);
        var htm = '<h1>Tipp: ' + quiz.title + '</h1>';
        htm += '<p>' + quiz.question + '</p>';
        htm += '<p>' + quiz.hint + '</p>';
        display_content(htm);
    }
    
    function display_info(input, skipped) {
        var quiz = quiz_by_input(input);
        var htm = '<h1>Wusstest du schon?</h1>';
        if (skipped === true)
            htm += '<p>Schade, die richtige Antwort wäre "' + quiz.solution + '" gewesen.</p>';
        else
            htm += '<p>Sehr gut!<p>';
        htm += '<p>' + quiz.info + '</p>';
        current_view = 'map';
        display_content(htm);
    }
    
    function quiz_by_input(input) {
        var quiz;
        if (typeof input === 'object')
            quiz = input;
        else if (typeof input === 'number') {
            if (!current_tour)
                throw 'Es ist keine Tour ausgewählt!';
            if (!(quiz = current_tour.points[input]))
                throw 'Ein Rätsel mit dieser ID existiert in der ausgewählten Tour nicht!';
        } else {
            if (!(quiz = save_data.nextQuizRdy()))
                if (save_data.lastAnswered().id < 0)
                    return false;
                else
                    quiz = save_data.lastAnswered();
        }
        return quiz;
    }
    
    function get_current() {
        return current_view;
    }
    
    return {
        display:{
            map: display_map,
            content: display_content,
            quiz: display_quiz,
            tipp: display_tipp,
            info: display_info
        },
        current: get_current,
        backto: function(str) {
            current_view = str;
            return this;
        }
    };
}();


var quizzes = {
    skip: function() {
        view.display.info(save_data.nextQuiz(), true);
        save_data.setLastAnswered(save_data.nextQuiz().id);
        mapControl.drawMarker(current_tour.points[save_data.nextQuiz().id].coords, 'active');
            console.info(save_data.nextQuiz().id + ', ' + save_data.startQuiz());
            if (save_data.nextQuiz().id == save_data.startQuiz())
                popup('Sehr gut, Du bist am Ende des Rundkurses angekommen.');
    },
    checkAnswer: function() {
        if (!save_data.nextQuiz())
            throw 'Es ist gar kein Quiz geöffnet!' + save_data.nextQuiz();
        if (current_tour.points[save_data.nextQuiz().id].solution === $('#answerField').val()) {
            view.display.info(save_data.nextQuiz());
            save_data.setLastAnswered(save_data.nextQuiz().id);
            mapControl.drawMarker(save_data.nextQuiz().coords, 'active');
            console.info(save_data.nextQuiz().id + ', ' + save_data.startQuiz());
            if (save_data.nextQuiz().id == save_data.startQuiz())
                popup('Sehr gut, Du bist am Ende des Rundkurses angekommen.');
        } else
            popup('Leider ist diese Antwort nicht richtig. Versuch es nochmal oder lass Dir mit einem Tipp helfen.',
                  ['Tipp', 'Erneut versuchen'], function() { view.display.tipp(save_data.nextQuiz()); });
    }
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
    
    $(e.currentTarget).hasClass('back2map') ? view.display.map() : view.backto('map').display.quiz(save_data.nextQuiz());
});
$('#impressum_click').click(function() {
    menu.hide();
    view.display.content('<h1>Impressum</h1><p>Diese App wurde von Studenten des Studiengangs Angewandte Informatik'+
                         ' Betriebliches Informationsmanagement Jahrgang 2013 im Rahmen der Projektmanagement'+
                         ' Vorlesung erstellt.</p>');
});
$('#stop-tour').click(function() {
    menu.hide();
    popup('Willst du die Tour wirklich abbrechen?', ['Ja', 'Nein'], function() {
        save_data.tourEnd();
        view.display.map();
    });
});