'use strict';

angular.module('myApp.led', ['myApp.services'])

.factory('ledWidgetDef', function () {
    return {
        name: 'LED',
        directive: 'dk-Led'
    };
})

.directive('dkLed', function () {
    return {
        replace: true,
        templateUrl: 'templates/ledDirectiveTemplate.html',
        controller: 'ledCtrl',
    };
})

.controller('ledCtrl', function ($scope, socket) {
    $scope.mypin = "13";
    $scope.toggle = "On";
    $scope.brightness = "255";
    $scope.blink = "500";
    $scope.type = "Constant";
    
    $scope.isPWM = function() {
        return([3,5,6,9,10,11].indexOf(parseInt($scope.mypin)) > -1);
    }

    var getLedSettings = function () {
        var myled = {
            pin: parseInt($scope.mypin),
            toggle: $scope.toggle,
            brightness: parseInt($scope.brightness),
            blink: parseInt($scope.blink),
            type: $scope.type
        }
        return (myled);
    }

    $scope.$watch('type', function (newVal, oldVal) {
        socket.emit("reqLed", getLedSettings());
    });
    
    $scope.$watch('toggle', function(newVal, oldVal) {
        socket.emit("reqLed", getLedSettings());
    });

});