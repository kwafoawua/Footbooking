/**
 * Created by pablo on 15/7/2017.
 */
angular.module('appFootBooking',[])

    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
               .state('home',
                   {url: '/index',
                   views: {
                       'fbcontainer': {
                           templateUrl: './home.html',
                           controller: 'AppCtrl',
                           abstract: false
                       }
                   }
            });



    });








