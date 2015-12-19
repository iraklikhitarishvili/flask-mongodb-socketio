var SocketClient = {
    initialize: function (onReceived) {
        var client = io.connect('http://secure-citadel-3717.herokuapp.com/');
        //var client = io.connect('http://127.0.0.1:5000/');
        client.on('connect', function () {
            client.emit('entities');
        });
        client.on('entities', function (data) {
            for (var i in data) {
                var item = JSON.parse(data[i]);
                var coordinates = item.location.coordinates;
                onReceived(coordinates[0], coordinates[1], item);

            }
        });
        client.on('entity', function (data) {
            var item = JSON.parse(data);
            var coordinates = item.location.coordinates;
            onReceived(coordinates[0], coordinates[1], item);
        });
    }
};