'use strict';

angular.module('myApp.services', ['btford.socket-io']).

factory('socket', function (socketFactory) {
    return socketFactory();
})

.value('pinWidgetCount', { count: 0})

//factory('widgetDefinitions', function (PinDataModel) {
//    return [{
//        name: 'random',
//        directive: 'wt-scope-watch',
//        attrs: {
//            value: 'randomValue'
//        }
//  }, {
//        name: 'time',
//        directive: 'wt-time'
//  }, {
//        name: 'datamodel',
//        directive: 'dk-pin-watch',
//        dataAttrName: 'value',
//        dataModelType: PinDataModel,
//        dataModelArgs: {
//            limit: 1000
//        },
//        settingsModalOptions: {
//            templateUrl: 'templates/pinWidgetSettingsTemplate.html'
//        }
//  }, {
//        name: 'gauge',
//        directive: 'wt-gauge',
//        attrs: {
//            gval: 50
//        },
//        style: {
//            width: '250px'
//        }
//  }];
//}).

//value('defaultWidgets', [
//    {
//        name: 'random'
//    },
//    {
//        name: 'time'
//    },
//    {
//        name: 'datamodel'
//    },
//    {
//        name: 'random',
//        style: {
//            width: '50%'
//        }
//    },
//    {
//        name: 'time',
//        style: {
//            width: '50%'
//        }
//    }
//  ]);

