'use strict';

angular.module('myApp.pin', ['myApp.services','smoothie-directive'])

.factory('pinWidgetDef', function (PinDataModel) {
    return {
        name: 'pinWidget',
        directive: 'dk-pin-watch',
        dataAttrName: 'mypin', // bind mypin in the isolate scope to the widgetData/updateScope functions
        dataModelType: PinDataModel,
        dataModelArgs: {
            limit: 1000
        },
        settingsModalOptions: {
            templateUrl: 'templates/pinWidgetSettingsTemplate.html',
            controller: 'PinWidgetSettingsCtrl'
        }
    };
})


.directive('dkPinWatch', function () {
    return {
        restrict: 'A',
        replace: true,
        template: '<div>Value<div class="alert alert-info">Pin: {{mypin.pin}} Value: {{mypin.value}}</div>      <smoothie-grid width="600">        <time-series callback="foo()" color="blue" rate="100"></time-series>        <time-series callback="foo()" color="#4b8e4b" fill="rgba(108, 255, 0, 0.34)" width="0" rate="200"></time-series>      </smoothie-grid></div>',
        controller: 'PinCtrl',
        scope: {
            mypin: '=mypin',
        }
    };
})

.controller('PinCtrl', function ($scope, socket, pinWidgetCount) {
    //    pinWidgetCount.count = pinWidgetCount.count+1;
    //    $scope.ctrlpin = pinWidgetCount.count;
    //    $scope.ctrlval = 0;
    
            $scope.foo = function() {
            return [new Date().getTime(), Math.random()*0.2];
        };
        
        $scope.goo = function() {
            return [new Date().getTime(), Math.random() * 30.0];
        };
    //    
        socket.on('send:sensor', function (data) {
            if (data.sensorID == $scope.mypin.pin)
                $scope.mypin.value = data.sensorVal;
        });
})

.factory('PinDataModel', function ($interval, WidgetDataModel, socket, pinWidgetCount) {
    function PinDataModel(options) {
        this.limit = (options && options.limit) ? options.limit : 500;
    }

    PinDataModel.prototype = Object.create(WidgetDataModel.prototype);

    PinDataModel.prototype.init = function () {
        

        pinWidgetCount.count = pinWidgetCount.count + 1;
                var pin = pinWidgetCount.count;
        this.widgetScope.widgetData = {pin: pin, value: 0};

        var that = this;

//        socket.on('send:sensor', function (data) {
//            pin = that.widgetScope.widgetData.pin;
//            if (data.sensorID == pin) {
//                var value = data.sensorVal;
//                that.updateScope({ pin: pin, value: value});
//            }
//        });
        
    };

    PinDataModel.prototype.destroy = function () {
        WidgetDataModel.prototype.destroy.call(this);
        $interval.cancel(this.intervalPromise);
    };

    return PinDataModel;
})

.controller('PinWidgetSettingsCtrl', function ($scope, $modalInstance, widget) {
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