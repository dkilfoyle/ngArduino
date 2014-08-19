'use strict';

angular.module('myApp.arduino', ['myApp.services'])

.factory('arduinoWidgetDef', function () {
    return {
        name: 'arduinoWidget',
        directive: 'dk-arduino'
    };
})

.directive('dkArduino', function () {
    return {
        replace: true,
        templateUrl: 'templates/arduinoDirectiveTemplate.html',
        controller: 'ArduinoCtrl',
    };
})

.controller('ArduinoCtrl', function ($scope, socket) {
    $scope.myport="none";
    $scope.myports=[];
    socket.emit("reqComPorts");
    $scope.connecttext = "Connect";
    $scope.connectclass = "btn btn-danger";
    
    $scope.connect = function() {
        socket.emit("reqArduinoConnect", {port: $scope.myport});
    }
    
    socket.on('resComPorts', function(data) {
        $scope.myports = data.ports;
        $scope.myport = data.ports[0];
    })
    
    socket.on('resArduinoReady', function() {
        $scope.connecttext = "Connected";
        $scope.connectclass = "btn btn-success";
    })
});

