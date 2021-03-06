var new_data = {
    "id": 192737642765,
    "name": "Grossstadtjungle2",
    "lang": "de",
    "title": "Mannheimer Innenstadt",
    "info": "Eine kleine Tour durch die Mannheimer Innenstadt",
    "modified": 0, // Timestamp
    "points": {
        0: {
            "id": 0,
            "coords": {"lat": 49.487412, "lng": 8.467297},
            "title": "P2 - Das Mahnmal",
            "intro": "Bei den Mannheimer Planken, der zentralen Einkaufsstraße Mannheims, wurde für jüdische Opfer des Nationalsozialismus ein Mahnmal errichtet. Auf diesem wurden in Spiegelschrift mehr als 2200 Opfer eingraviert.",
            "question": "Wie viele Seiten des Mahnmals sind beschrieben?",
            "answeres": ["4", "6", "3"],
            "solution": 0,
            "info": "Der Kubus, der vom Bildhauer Jochen Kitzbihler angefertigt wurde, ist schräg zum Paradeplatz ausgerichtet und weist eine Kantenlänge von insgesamt 3 Metern auf. Er wurde am 25. November 2003 eingeweiht.",
            "nextid": 1
        }
    }
}

var tour_data = {
    "id": 0,
    "name": "default",
    "lang": "de",
    "title": "Standardtour",
    "info": "Eine kleine Tour durch die Mannheimer Innenstadt",
    "modified": 0, // Timestamp
    "points": {
        0: {
            "id": 0,
            "coords": {"lat": 49.487412, "lng": 8.467297},
            "title": "P2 - Das Mahnmal",
            "intro": "Bei den Mannheimer Planken, der zentralen Einkaufsstraße Mannheims, wurde für jüdische Opfer des Nationalsozialismus ein Mahnmal errichtet. Auf diesem wurden in Spiegelschrift mehr als 2200 Opfer eingraviert.",
            "question": "Wie viele Seiten des Mahnmals sind beschrieben?",
            "solution": "4",
            "hint": "Das Mahnmal ist ein Kubus.",
            "info": "Der Kubus, der vom Bildhauer Jochen Kitzbihler angefertigt wurde, ist schräg zum Paradeplatz ausgerichtet und weist eine Kantenlänge von insgesamt 3 Metern auf. Er wurde am 25. November 2003 eingeweiht.",
            "nextid": 1
        },
        1: {
            "id": 1,
            "coords": {"lat": 49.489692, "lng": 8.467397},
            "title": "G1 - Der Marktplatz",
            "intro": "Wie Paradeplatz und Schloss, ist auch der Mannheimer Marktplatz an der Kurpfalzstraße vorzufinden. Diesen schmückt der Marktplatzbrunnen. Der Götterbote Merkur, welcher auf diesem Brunnen sogar die Stadtgöttin Mannhemia (Mannheimia) überragt, hält in einer Hand den Hermesstab.",
            "question": "Was hält er in der anderen Hand?",
            "solution": "Sonne",
            "hint": "Das Objekt verkörpert den Stern, der in unserem Sonnensystem im Zentrum steht.",
            "info": "Der Namensgebung entsprechend ist der Marktplatz nach wie vor Veranstaltungsort für Mannheimer Wochenmärkte: Dienstag und Donnerstag 08:00 bis 14:00 Uhr bzw. Samstag 08:00 bis 15:00 Uhr. Ebenso kann man täglich Zeuge eines Glockenspiels des Glockenturms vor Ort werden: um 07:45 Uhr, 11:45 Uhr und 17:45 Uhr.",
            "nextid": 2
        },
        2: {
            "id": 2,
            "coords": {"lat": 49.489949, "lng": 8.462149},
            "title": "E6 - Der Friedensengel",
            "intro": "An den Mannheimer Planken und in der Nähe des Rathauses befindet sich die Skulptur des Friedensengels. Sie soll an Opfer des Regimes des 3. Reiches erinnern.",
            "question": "Welcher Bundeskanzler weihte den Friedensengel 1952 ein?",
            "solution": "Konrad Adenauer",
            "hint": "Meist werden bedeutende Ereignisse fotographisch festgehalten.",
            "info": "Konrad Adenauer selbst weihte den Friedensengel 1952 ursprünglich im Quadrat B4 ein. Erst 1983 versetzte man es zum heutigen Standort neben dem Rathaus.",
            "nextid": 3
        },
        3: {
            "id": 3,
            "coords": {"lat": 49.489862, "lng": 8.465416},
            "title": "F2 - Die Hauptsynagoge",
            "intro": "Nahe der aktuellen Synagoge Mannheims (F3) und nicht weit vom Marktplatz entfernt befand sich die Hauptsynagoge der jüdischen Gemeinde.",
            "question": "Welcher Art von Angriff zerstörte im Zweiten Weltkrieg neben Sprengladungen die Synagoge?",
            "solution": "Ein Luftangriff",
            "hint": "Es war kein Bodenangriff.",
            "info": "Nach mehreren Vorgängerbauten wurde die hier beschriebene Synagoge in F2 zwischen 1851 und 1855 errichtet. Nach der Machtergreifung der Nationalsozialisten wurde die Einrichtung während der Novemberpogrome 1938 von SA-Männern erstmals zerstört. Es wurde Feuer gelegt und Sprengstoff gezündet bis die jüdische Gemeinde im darauffolgenden Jahr dazu gezwungen war sie an die Stadverwaltung zu 'verkaufen'.",
            "nextid": 4
        },
        4: {
            "id": 4,
            "coords": {"lat": 49.486409, "lng": 8.462112},
            "title": "B3 - Der Schillerplatz",
            "intro": "Zwischen dem Mannheimer Schloss und dem Museum Zeughaus (D5) befindet sich eine Grünanlage, benannt nach dem deutschen Dichter, Philosoph und Historiker Friedrich Schiller. Ihm gilt auch eines der Denkmale vor Ort.",
            "question": "Welches 1778 eröffnete Gebäude, das hier an diesem Ort stand, war ein Geschenk den Kurfürsten Karl Theodors, nachdem er Bayern erbte?",
            "solution": "Das Nationaltheater",
            "hint": "Vor Ort befindet sich eine Tafel, auf der die Lösung zu finden ist.",
            "info": "Im Jahr 1782 wurde an diesem Ort Friedrich Schillers 'Die Räuber' uraufgeführt.",
            "nextid": 5
        },
        5: {
            "id": 5,
            "coords": {"lat": 49.483994, "lng": 8.475750},
            "title": "Der Wasserturm",
            "intro": "Am Ende der zentralen Einkaufsstraße Mannheims in Richtung Südosten steht ein Wahrzeichen Mannheims: der Wasserturm. Dieser verfügt über eine 'Aussichtsplattform'.",
            "question": "Blickt man mittig von dieser Aussichtsplattform in Richtung Augustanlage, ist eine Laterne zu sehen, deren Fuß scheinbar auf eine Skulptur zeigt. Welchen Titel trägt diese Skulpur?",
            "solution": "Das Rad",
            "hint": "Vor Ort gibt es eine Tafel über den Bildhauer der Skulptur, Morice Lipsi.",
            "info": "Zwischen 1886 und 1889 wurde der 60 Meter hohe Turm (der Durchmesser liegt bei 19 Metern) nach Plänen von Gustav Halmhuber gebaut. Tatsächlich hatte er ursprünglich alle Funktionen der Trinkwasserversorgung zu erfüllen.",
            "nextid": 6
        },
        6: {
            "id": 6,
            "coords": {"lat": 49.483370, "lng": 8.462130},
            "title": "Schloss Mannheim",
            "intro": "Obwohl es selbst nicht in den Quadraten liegt, sind diese zum Schloss hin ausgerichtet. Auf dem Schlossplatz sind Denkmäler von Karl Friedrich und Karl Ludwig zu sehen.",
            "question": "Die Kunsthalle Mannheim und die Skulptur Karl Friedrichs haben ihr Entstehungsjahr gemeinsam. Welches Jahr ist es?",
            "solution": "1907",
            "hint": "Die Mannheimer Kunsthalle wurde zum 300. Stadtjubiliäum eröffnet.",
            "info": "Unter anderem beherbergt das Schloss Mannheim aktuell die Universitätsbibliothek, Seminarräume und Vorlesungssäle der Mannheimer Universität.",
            "nextid": 0
        }
    }
};

var tour_data2 = {
    "id": 0,
    "name": "default",
    "lang": "de",
    "title": "Standardtour",
    "info": "Eine kleine Tour durch die Mannheimer Innenstadt",
    "modified": 0, // Timestamp
    "points": {
        0: {
            "id": 0,
            "coords": {"lat": 49.473616, "lng": 8.533724},
            "title": "Heidis",
            "intro": "Fast Food um die Ecke.",
            "question": "Name eines von Studenten bevorzugten Imbiss?",
            "solution": "Heidis Imbiss",
            "hint": "Antwort steht auf der Tafel vorm Lokal.",
            "info": "Mittags wird dieser Ort von Studenten überlaufen.",
            "nextid": 2
        },
        1: {
            "id": 1,
            "coords": {"lat": 49.473052, "lng": 8.535167},
            "title": "Gebäude E",
            "intro": "Hier befinden sich die größten Vorlesungssäle.",
            "question": "Was ist in diesem Gebäude noch in Massen vorhanden?",
            "solution": "Bücher",
            "hint": "Viel Wissen wird darin gesammelt.",
            "info": "Hier ist die Mensa der DHBW im Erdgeschoss.",
            "nextid": 0
        },
        2: {
            "id": 2,
            "coords": {"lat": 49.474426, "lng": 8.536643},
            "title": "Supermarkt",
            "intro": "In den Supermärkten um die DHBW wimmelt es von Studenten und Rentnern.",
            "question": "Welche Supermarktkette betreibt hier in der Nähe auch eine Tankstelle?",
            "solution": "Edeka",
            "hint": "Fünf Buchstaben.",
            "info": "Außerdem befinden sich ALDI und Lidl in unmittelbarer Nähe.",
            "nextid": 1
        }
    }
};