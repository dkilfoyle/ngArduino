'use strict';

angular.module('myApp.led', ['myApp.services'])

.factory('ledWidgetDef', function () {
    return {
        name: 'ledWidget',
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
    $scope.mypin="13";
    $scope.toggletext = "On";
    $scope.brightness = "255";
    $scope.blink = "500";
    $scope.type = "Constant";
    
    var getLedSettings = function() {
        var myled = {
            pin: parseInt($scope.mypin),
            toggle: $scope.toggletext,
            brightness: $scope.brightness,
            blink: parseInt($scope.blink),
            type: parseInt($scope.type)
        }
        return(myled);
    }
    
    $scope.onoffbutton = function() {
        if ($scope.toggletext == "On") {
            $scope.toggletext = "Off";
            socket.emit("reqLed", getLedSettings());
        }
        else {
            $scope.toggletext = "On";
            socket.emit("reqLed", getLedSettings());
        }
    }
    
});

