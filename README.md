#Hilfreiche Links
- http://davidrs.com/wp/phonegap-3-0-leaflet-offline-maps/

#Known Issuses
- [A-01] Navigiert man durch die App und läuft dabei, kommt man immer wieder zu seiner aktuellen Position auf der Karte
  - Lösung ist das ausgliedern des "setViews" und zusätzlich ein Button zum zentrieren auf aktuelle Position
- [A-02] GPS-Koordinaten werden auch beim ausschalten des Bildschirms gesucht. Das ist unnötig
  - Lösung ist das deaktivieren der GPS-Suche bei display=offline (verfügbares Event bei PhoneGap)
