<map>
    <div id="map_canvas"></div>
    
    <script>
        /* global L */
        
        navigator.geolocation.getCurrentPosition(onSuccess);
        
        function onSuccess(position) {
            var map = new L.Map(document.getElementById('map_canvas'), {center: new L.LatLng(position.coords.latitude, position.coords.longitude), zoom: 18});
            var googleLayer = new L.Google('ROADMAP');
            map.addLayer(googleLayer);
        }
    </script>
</map>