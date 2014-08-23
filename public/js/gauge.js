'use strict';

/* Directives */

angular.module('myApp.gauge', [])

.factory('gaugeWidgetDef', function () {
    return {
        name: 'gaugeWidget',
        directive: 'wt-gauge',
        attrs: {
            gval: 50
        },
        style: {
            width: '250px'
        }
    };
})

.directive('wtGauge', function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            label: '@',
            min: '=',
            max: '=',
            value: '=',
            gval: '='
        },
        templateUrl: 'templates/gauge.html',
        link: function (scope, element, attrs) {
            var config = {
                size: 200,
                label: attrs.label,
                min: undefined !== scope.min ? scope.min : 0,
                max: undefined !== scope.max ? scope.max : 100,
                minorTicks: 5
            };

            var range = config.max - config.min;
            config.yellowZones = [{
                from: config.min + range * 0.75,
                to: config.min + range * 0.9
            }];
            config.redZones = [{
                from: config.min + range * 0.9,
                to: config.max
            }];

            console.log(element);
            scope.gauge = new Gauge(element[0].children[2], config);
            scope.gauge.render();

            function update(value) {
                var percentage;
                if (_.isString(value)) {
                    percentage = parseFloat(value);
                } else if (_.isNumber(value)) {
                    percentage = value;
                }

                if (!_.isUndefined(percentage)) {
                    scope.gauge.redraw(percentage);
                }
            }

            update(0);

            scope.$watch('gval', function (value) {
                if (scope.gauge) {
                    update(value);
                }
            });
        }
    };
});