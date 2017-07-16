/**
 * Created by pablo on 15/7/2017.
 */
'use strict';
angular.module('appFootBooking', ['ngRoute'])

    .config(function ($routeProvider) {
          $routeProvider.when('/', {
    templateUrl : 'templates/home.html',
    controller  : 'HomeController'
  }).otherwise('/');
            
    });