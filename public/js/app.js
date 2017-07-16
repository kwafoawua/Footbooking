/**
 * Created by pablo on 15/7/2017.
 */
angular.module('appFootBooking',[])

    .config(function($stateProvider, $urlRouterProvider) {
         $stateProvider
               .state('app', {
                    url: '/index',
                templateUrl: './index.html',
                   abstract: false,
                   controller: 'AppCtrl'
            })
             .state('');

        $urlRouterProvider.otherwise('/index');

    });








