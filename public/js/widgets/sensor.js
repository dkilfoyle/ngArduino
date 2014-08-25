'use strict';

angular.module('myApp.sensor', ['myApp.services', 'smoothie-directive'])

.value('sensorWidgetCount', {
    count: 0
})

.factory('sensorWidgetDef', function (SensorDataModel) {
    return {
        name: 'Sensor',
        directive: 'dk-sensor-watch',
        size: { width: "400px", height: "250px"},
        dataAttrName: 'mypin', // bind mypin in the isolate scope to the widgetData/updateScope functions
        dataModelType: SensorDataModel,
        dataModelArgs: {
            limit: 1000
        },
        settingsModalOptions: {
            templateUrl: 'templates/SensorWidgetSettingsTemplate.html',
            controller: 'SensorWidgetSettingsCtrl'
        }
    };
})


.directive('dkSensorWatch', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'templates/sensorDirectiveTemplate.html',
        controller: 'SensorCtrl',
        scope: {
            mypin: '=mypin',
        }
    };
})

.controller('SensorCtrl', function ($scope, socket) {
    
    $scope.$watch('mypin.pin', function (newVal, oldVal) {
        socket.emit("sensorAdd", {
            pin: newVal,
            freq: 500
        });
    });

    $scope.getSensorGraphValue = function () {
        return [new Date().getTime(), $scope.mypin.value];
    };

    socket.on('sensorReading', function (data) {
        if (data.pin == $scope.mypin.pin[1]) {
            $scope.mypin.value = data.value;
        }
    });
    
})

.factory('SensorDataModel', function (WidgetDataModel, sensorWidgetCount) {
    function SensorDataModel(options) {
        this.limit = (options && options.limit) ? options.limit : 500;
    }

    SensorDataModel.prototype = Object.create(WidgetDataModel.prototype);

    SensorDataModel.prototype.init = function () {
        this.widgetScope.widgetData = {
            pin: "A" + sensorWidgetCount.count,
            value: 0
        };
        sensorWidgetCount.count = sensorWidgetCount.count + 1;
    };

    SensorDataModel.prototype.destroy = function () {
        WidgetDataModel.prototype.destroy.call(this);
    };

    return SensorDataModel;
})

.controller('SensorWidgetSettingsCtrl', function ($scope, $modalInstance, widget) {
    // add widget to scope
    $scope.widget = widget;

    // set up result object
    $scope.result = jQuery.extend(true, {}, widget);
    $scope.result.pin = widget.dataModel.widgetScope.widgetData.pin;

    $scope.ok = function () {
        console.log('calling ok from widget-specific settings controller!');
        widget.dataModel.widgetScope.widgetData.pin = $scope.result.pin;
        $modalInstance.close($scope.result);
    };

    $scope.cancel = function () {
        console.log('calling cancel from widget-specific settings controller!');
        $modalInstance.dismiss('cancel');
    };
});