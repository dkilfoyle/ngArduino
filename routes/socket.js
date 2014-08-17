/*
 * Serve content over a socket
 */
'use strict';

module.exports = function (socket) {
    socket.emit('send:gval', {
        gval: 50
    });

    var x = 0;
    setInterval(function () {
        socket.emit('send:sensor', {
            sensorID: 1,
            sensorVal: x
        });
        
        socket.emit('send:compass', {
            heading: (x * 5) % 360
        })
        x = x + 1;
    }, 3000);
};