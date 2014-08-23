/*
 * Serve content over a socket
 */
'use strict';

var five = require('johnny-five'),
    board, sensor, ping;
var sp = require('serialport');
var myleds = {};
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
            console.log("sensorAdd" + val.pin);
            sensor = new five.Sensor({
                pin: val.pin,
                freq: val.freq
            });
            sensor.myname = val.name;

            sensor.on("data", function (err, value) {
                //console.log(value);
                socket.emit('sensorReading', {
                    value: this.value,
                    name: this.myname,
                    pin: this.pin
                });
            });
        }
    });

    socket.on("reqLed", function (led) {
        if (board != undefined) {
            var myled;
            if (led.pin in myleds) {
                myled = myleds[led.pin];
                console.log("retrieving " + myled.pin);
            }
            else
            {
                myled = new five.Led({
                    pin: led.pin
                });
                myleds[led.pin]=myled;
                console.log("created new " + myled);
            }

            // myled.brightness(led.brightness);
            
            console.log(led)

            if (led.type == "Blink")
                myled.blink(led.blink);

            if (led.type == "Pulse")
                myled.pulse(led.blink)
                
            if (led.type == "Constant")
                myled.stop();
            
            if (led.toggle == "On")
                myled.on();
            else
                myled.stop().off();

        }
    });

//    var x = 0;
//    setInterval(function () {
//        socket.emit('send:sensor', {
//            sensorID: 1,
//            sensorVal: x
//        });
//
//        socket.emit('send:compass', {
//            heading: (x * 5) % 360
//        })
//        x = x + 1;
//    }, 3000);
};