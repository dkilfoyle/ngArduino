'use strict';

angular.module('myApp.arduino', ['myApp.services'])

.factory('arduinoWidgetDef', function () {
    return {
        name: 'Arduino',
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
    $scope.board = {type: ""};

    $scope.connecttext = "Connect";
    $scope.connectclass = "btn btn-success";
    
    socket.emit("reqComPorts");
    socket.emit("reqArduinoAlready");
    
    $scope.connect = function() {
        socket.emit("reqArduinoConnect", {port: $scope.myport});
    }
    
    socket.on('resComPorts', function(data) {
        $scope.myports = data.ports;
        //$scope.myport = data.ports[0];
    })
    
    socket.on('resArduinoReady', function(board) {
        $scope.connecttext = "Disconnect";
        $scope.connectclass = "btn btn-danger";
        $scope.board.type = board.type;
        $scope.myport = board.port;
    })
});

