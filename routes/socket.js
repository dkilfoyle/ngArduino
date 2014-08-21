/*
 * Serve content over a socket
 */
'use strict';

var five = require('johnny-five'),
    board;
var sp = require('serialport');
var myled;
var isConnected = false;

module.exports = function (socket) {

    socket.on('reqComPorts', function () {
        sp.list(function (err, ports) {
            var myports = [];
            ports.forEach(function (port) {
                myports.push(port.comName);
            });
            socket.emit("resComPorts", {
                ports: myports
            });
        })
    })

    socket.on('reqArduinoAlready', function (val) {
        if (isConnected) {
            socket.emit("resArduinoReady", {
                type: board.type,
                port: board.io.port
            });
        }
    });


    socket.on('reqArduinoConnect', function (val) {
        board = new five.Board({
            port: val.port
        });
        board.on("ready", function () {
            isConnected = true;
            socket.emit("resArduinoReady", {
                type: board.type,
                port: board.io.port
            });
        });
    });

    socket.on("pingAdd", function (val) {
        if (board != undefined) {
            ping = new five.Ping({
                pin: val.pin,
                freq: val.freq
            });
            ping.myname = val.name;
            ping.on("data", function (err, value) {
                board.emit('distance', {
                    distance: this.cm,
                    name: this.myname
                });
            });

            board.on('distance', function (val) {
                socket.emit('distance', val);
            });
        }
    });

    socket.on("sensorAdd", function (val) {
        if (board != undefined) {
            sensor = new five.Sensor({
                pin: val.pin,
                freq: val.freq
            });
            sensor.myname = val.name;

            sensor.on("data", function (err, value) {
                board.emit('sensorReading', {
                    value: this.value,
                    name: this.myname
                });
            });

            board.on('sensorReading', function (val) {
                socket.emit('sensorReading', val);
            });
        }
    });

    socket.on("reqLed", function (led) {
        if (board != undefined) {
            myled = new five.Led({
                pin: led.pin
            });
            console.log(myled);
            if (led.toggle == "On")
                myled.on()
            else
                myled.off();
        }
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