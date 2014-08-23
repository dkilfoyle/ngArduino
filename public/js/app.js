'use strict';

angular.module('myApp', [
    'ngRoute',
    'myApp.dashboard',
    'ui.dashboard'
  ])

.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/dashboard.html',
            controller: 'DashboardCtrl'
        })
        .when('/layouts', {
            templateUrl: 'templalayouts.html',
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