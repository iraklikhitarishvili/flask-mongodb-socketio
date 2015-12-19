var MapDrawer = {
    map: undefined,
    center: {lat: 41.698659, long: 44.798071},
    zoomLevel: 15,
    options: undefined,
    markers: [],
    initialize: function (mapCanvas) {
        var coordinates = new google.maps.LatLng(MapDrawer.center.lat, MapDrawer.center.long);
        MapDrawer.options = {
            center: coordinates,
            zoom: MapDrawer.zoomLevel,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        MapDrawer.map = new google.maps.Map(mapCanvas, MapDrawer.options);
        MapDrawer.updateLocation();
    },
    addMarker: function (lat, long, additionalData) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
            map: MapDrawer.map,
            //title: 'Hello World!',
            additionalData: additionalData
        });
        MapDrawer.markers.push(marker);
    },
    removeMarker: function (marker) {
        marker.setMap(null);
        var index = MapDrawer.markers.indexOf(marker);
        MapDrawer.markers.splice(index, 1);
    },
    updateLocation: function () {
        var move = function (position) {
            if (position.coords.latitude && position.coords.longitude) {
                MapDrawer.center.lat = position.coords.latitude;
                MapDrawer.center.long = position.coords.longitude;
                MapDrawer.map.panTo(new google.maps.LatLng(MapDrawer.center.lat, MapDrawer.center.long));
            }
            else {
                console.error("no latitude and longitude");
            }
        };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(move);
        } else {
            console.error("not supported");
        }
    }

};
//# sourceMappingURL=map-drawer.js.map