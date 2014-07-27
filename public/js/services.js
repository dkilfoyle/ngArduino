'use strict';

angular.module('myApp.services', ['btford.socket-io']).

factory('socket', function (socketFactory) {
  return socketFactory();
}).

factory('widgetDefinitions', function (RandomDataModel) {
  return [{
    name: 'random',
    directive: 'wt-scope-watch',
    attrs: {
      value: 'randomValue'
    }
  }, {
    name: 'time',
    directive: 'wt-time'
  }, {
    name: 'datamodel',
    directive: 'wt-scope-watch',
    dataAttrName: 'value',
    dataModelType: RandomDataModel
  }, {
    name: 'gauge',
    directive: 'wt-gauge',
    attrs: {
      gval: 50
    },
    style: {
      width: '250px'
    }
  }];
}).

value('defaultWidgets', [
  {
    name: 'random'
    },
  {
    name: 'time'
    },
  {
    name: 'datamodel'
    },
  {
    name: 'random',
    style: {
      width: '50%'
    }
    },
  {
    name: 'time',
    style: {
      width: '50%'
    }
    }
  ]).

factory('RandomDataModel', function ($interval, WidgetDataModel) {
  function RandomDataModel() {}

  RandomDataModel.prototype = Object.create(WidgetDataModel.prototype);

  RandomDataModel.prototype.init = function () {
    this.updateScope('-');
    this.intervalPromise = $interval(function () {
      var value = Math.floor(Math.random() * 100);
      this.updateScope(value);
    }.bind(this), 500);
  };

  RandomDataModel.prototype.destroy = function () {
    WidgetDataModel.prototype.destroy.call(this);
    $interval.cancel(this.intervalPromise);
  };

  return RandomDataModel;
});