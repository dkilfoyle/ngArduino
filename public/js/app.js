'use strict';

angular.module('myApp', [
    'ngRoute',

    'myApp.controllers',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',

     // 3rd party dependencies
    'btford.socket-io',
    'ui.dashboard'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/explicit-saving', {
        templateUrl: 'view.html',
        controller: 'ExplicitSaveDemoCtrl'
      })
      .when('/layouts', {
        templateUrl: 'layouts.html',
        controller: 'LayoutsDemoCtrl'
      })
      .when('/layouts/explicit-saving', {
        templateUrl: 'layouts.html',
        controller: 'LayoutsDemoExplicitSaveCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });