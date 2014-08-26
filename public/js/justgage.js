angular.module("justgage-directive", [])
  .directive('justGage', ['$timeout', function ($timeout) {
    return {
      restrict: 'EA',
      scope: {
        min: '=',
        max: '=',
        title: '@',
        value: '='
      },
      template: '<div></div>',
      link: function (scope, element) {
        $timeout(function () {
          var graph = new JustGage({
            parentNode: element[0],
            min: scope.min || 0,
            max: scope.max || 100,
            title: scope.title || "Gage",
            value: scope.value,
            width:100,
            height: 100
          });

          scope.$watch('max', function (updatedMax) {
            if (updatedMax) {
              graph.refresh(scope.value, updatedMax);
            }
          }, true);

          scope.$watch('value', function (updatedValue) {
            if (updatedValue) {
              graph.refresh(updatedValue);
            }
          }, true);
        });
      }
    };
  }]);
