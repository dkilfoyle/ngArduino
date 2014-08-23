'use strict';

angular.module('myApp.dashboard', ['myApp.services', 'myApp.sensor', 'myApp.compass', 'myApp.arduino', 'myApp.led', 'myApp.gauge'])

.controller('DashboardCtrl', function ($scope, $window, sensorWidgetDef, compassWidgetDef, arduinoWidgetDef, ledWidgetDef, gaugeWidgetDef) {

    var widgetDefinitions = [
        arduinoWidgetDef,
        sensorWidgetDef,
        compassWidgetDef,
        ledWidgetDef,
    ];

    var defaultWidgets = [
        {
            name: 'Arduino'
        },
        {
            name: 'Sensor'
        }
    ];

    $scope.dashboardOptions = {
        widgetButtons: true,
        widgetDefinitions: widgetDefinitions,
        defaultWidgets: defaultWidgets,
        storage: $window.localStorage,
        storageId: 'demo'
    };
});