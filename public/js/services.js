'use strict';

angular.module('myApp.services', ['btford.socket-io']).

factory('socket', function (socketFactory) {
    return socketFactory();
});