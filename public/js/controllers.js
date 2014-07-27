'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services']).

controller('DashboardCtrl', function ($scope, $interval, $window, widgetDefinitions, defaultWidgets, socket) {

  $scope.dashboardOptions = {
    widgetButtons: true,
    widgetDefinitions: widgetDefinitions,
    defaultWidgets: defaultWidgets,
    storage: $window.localStorage,
    storageId: 'demo'
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
}).

controller('ExplicitSaveDemoCtrl', function ($scope, $interval, $window, widgetDefinitions, defaultWidgets) {

  $scope.dashboardOptions = {
    widgetButtons: true,
    widgetDefinitions: widgetDefinitions,
    defaultWidgets: defaultWidgets,
    storage: $window.localStorage,
    storageId: 'explicitSave',
    explicitSave: true
  };
  $scope.randomValue = Math.random();
  $interval(function () {
    $scope.randomValue = Math.random();
  }, 500);
}).

controller('LayoutsDemoCtrl', function ($scope, widgetDefinitions, defaultWidgets, LayoutStorage, $interval) {
  $scope.layoutOptions = {
    storageId: 'demo-layouts',
    storage: localStorage,
    storageHash: 'fs4df4d51',
    widgetDefinitions: widgetDefinitions,
    defaultWidgets: defaultWidgets,
    defaultLayouts: [
      {
        title: 'Layout 1',
        active: true,
        defaultWidgets: defaultWidgets
        },
      {
        title: 'Layout 2',
        active: false,
        defaultWidgets: defaultWidgets
        },
      {
        title: 'Layout 3',
        active: false,
        defaultWidgets: defaultWidgets
        }
      ]
  };
  $scope.randomValue = Math.random();
  $interval(function () {
    $scope.randomValue = Math.random();
  }, 500);

}).

controller('LayoutsDemoExplicitSaveCtrl', function ($scope, widgetDefinitions, defaultWidgets, LayoutStorage, $interval) {

  $scope.layoutOptions = {
    storageId: 'demo-layouts',
    storage: localStorage,
    storageHash: 'fs4df4d51',
    widgetDefinitions: widgetDefinitions,
    defaultWidgets: defaultWidgets,
    explicitSave: true,
    defaultLayouts: [
      {
        title: 'Layout 1',
        active: true,
        defaultWidgets: defaultWidgets
        },
      {
        title: 'Layout 2',
        active: false,
        defaultWidgets: defaultWidgets
        },
      {
        title: 'Layout 3',
        active: false,
        defaultWidgets: defaultWidgets
        }
      ]
  };
  $scope.randomValue = Math.random();
  $interval(function () {
    $scope.randomValue = Math.random();
  }, 500);

});