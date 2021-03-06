// source: https://github.com/gntikos/angular-smoothiecharts

angular.module('smoothie-directive', [])
    .directive('smoothieGrid', function () {
        return {
            template: '<canvas ng-transclude></canvas>',
            replace: true,
            transclude: true,
            restrict: 'E',

            scope: {
                background: '@',
                lineColor: '@',
                lineWidth: '@',
                labelColor: '@',
                maxValue: '@',
                minValue: '@'
            },

            controller: function ($scope, $element) {
                this.canvas = $element[0];

                this.smoothie = new SmoothieChart({
                    maxValue: $scope.maxValue || 1000,
                    minValue: $scope.minValue || 0,

                    grid: {
                        strokeStyle: 'rgb(125, 0, 0)',
                        fillStyle: 'rgb(60, 0, 0)',
                        lineWidth: 1,
                        millisPerLine: 250,
                        verticalSections: 6,
                    },
                    labels: {
                        fillStyle: 'rgb(255, 255, 0)',
                        disabled: false
                    }
                });

                $scope.$on("widgetResized", function (event, mysize) {
                    if (mysize.height) $element[0].height = mysize.height-120;
                    if (mysize.width) $element[0].width = mysize.width-60;
                });
            }
        };
    })

.directive('timeSeries', function ($interval) {
    return {
        restrict: 'E',
        require: '^smoothieGrid',

        scope: {
            rate: '@',
            color: '@',
            width: '@',
            fill: '@',
            callback: '&'
        },

        controller: function ($scope, $element) {
            $scope.rate = $scope.rate || 1000;
            $scope.line = new TimeSeries();
            $scope.callback = $scope.callback ? $scope.callback : function () {
                return false;
            };
        },

        link: function (scope, element, attrs, controller) {
            controller.smoothie.streamTo(controller.canvas, scope.rate);

            controller.smoothie.addTimeSeries(scope.line, {
                strokeStyle: scope.color || 'green',
                fillStyle: scope.fill,
                lineWidth: scope.width || 2
            });

            var updateInterval = $interval(function () {
                var point = scope.callback();
                scope.line.append(point[0], point[1]);
            }, scope.rate);

            element.on('$destroy', function () {
                $interval.cancel(updateInterval);
            });
        }
    };
});