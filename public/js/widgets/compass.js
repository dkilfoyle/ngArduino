'use strict';

angular.module('myApp.compass', ['myApp.services'])

.factory('compassWidgetDef', function () {
    return {
        name: 'Compass',
        directive: 'dk-compass',
        dataAttrName: 'heading',
        attrs: { size: 100 }
    };
})


.directive('dkCompass', function () {
    return {
        replace: true,
        scope: {
            label: '@',
            min: '=',
            max: '=',
            heading: '='
        },
        template: '<canvas>Canvas not available</canvas>',
        controller: 'CompassCtrl',
        link: function (scope, element, attrs) {
            var config = {
                size: attrs.size,
            };

            scope.compass = new steelseries.Compass(element[0], config);
            scope.compass.setValue(0);

            function update(value) {
                scope.compass.setValue(value);
            }

            scope.$watch('heading', function (value) {
                if (scope.compass) {
                    update(value);
                }
            });
        }
    };
})

.controller('CompassCtrl', function ($scope, socket) {
        socket.on('send:compass', function (data) {
            $scope.heading = data.heading;
        });
});

