<map>

    <script>
        /* global L */

        navigator.geolocation.getCurrentPosition(onSuccess);

        function onSuccess(position) {
            var map = L.map(document.getElementsByTagName('map')[0]).setView([position.coords.latitude, position.coords.longitude], 18);

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
        }
    </script>
</map>