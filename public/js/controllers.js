'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services', 'myApp.pin', 'myApp.compass']).

controller('DashboardCtrl', function ($scope, $interval, $window, socket, pinWidgetDef, compassWidgetDef) {

    var widgetDefinitions = [
    {
        name: 'random',
        directive: 'wt-scope-watch',
        attrs: {
            value: 'randomValue'
        }
    },  
    {
        name: 'time',
        directive: 'wt-time'
    },
    pinWidgetDef,
    compassWidgetDef, 
    {
        name: 'gauge',
        directive: 'wt-gauge',
        attrs: {
            gval: 50
        },
        style: {
            width: '250px'
        }
    }];
    var defaultWidgets = [
        {
            name: 'compassWidget'
        },
        {
            name: 'pinWidget'
    }];

    
    $scope.dashboardOptions = {
        widgetButtons: true,
        widgetDefinitions: widgetDefinitions,
        defaultWidgets: defaultWidgets,
//        storage: $window.localStorage,
//        storageId: 'demo'
    };

    $scope.gval = 25;
    socket.on('send:gval', function (data) {
        console.log(data);
        $scope.gval = data.gval;
    });

    $scope.randomValue = Math.random();
    $interval(function () {
        $scope.randomValue = Math.random();
    }, 500);
});

