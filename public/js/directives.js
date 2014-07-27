'use strict';

/* Directives */

angular.module('myApp.directives', []).

directive('wtGauge', function () {
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
    templateUrl: 'gauge.html',
    link: function (scope, element, attrs) {
      var config = {
        size: 200,
        label: attrs.label,
        min: undefined !== scope.min ? scope.min : 0,
        max: undefined !== scope.max ? scope.max : 100,
        minorTicks: 5
      };

      var range = config.max - config.min;
      config.yellowZones = [
        {
          from: config.min + range * 0.75,
          to: config.min + range * 0.9
          }
        ];
      config.redZones = [
        {
          from: config.min + range * 0.9,
          to: config.max
          }
        ];

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
})

.directive('wtTime', function ($interval) {
  return {
    restrict: 'A',
    scope: true,
    replace: true,
    template: '<div>Time<div class="alert alert-success">{{time}}</div></div>',
    link: function (scope) {
      function update() {
        scope.time = new Date().toLocaleTimeString();
      }

      update();

      var promise = $interval(update, 500);

      scope.$on('$destroy', function () {
        $interval.cancel(promise);
      });
    }
  };
})
  .directive('wtScopeWatch', function () {
    return {
      restrict: 'A',
      replace: true,
      template: '<div>Value<div class="alert alert-info">{{value}}</div></div>',
      scope: {
        value: '=value'
      }
    };
  });