<map>
    
    <script>
        /* global L */
        
        navigator.geolocation.getCurrentPosition(onSuccess);
        
        function onSuccess(position) {
            var mapOpts = {
                center: new L.LatLng(position.coords.latitude, position.coords.longitude),
                zoom: 18,
            };
            
            var map = new L.Map(document.getElementsByTagName('map')[0], mapOpts);
            var googleLayer = new L.Google('ROADMAP');
            map.addLayer(googleLayer);
        }
    </script>
</map>