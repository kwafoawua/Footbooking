'use strict';
angular.module('footBookingApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    'content': {
                        templateUrl: 'templates/home.html',
                        controller: 'footBookingAppCtrl'
                    }
                }
            })

            .state('loginComplejo', {
                url: '/signinComplejo',
                views: {
                    'content': {
                        templateUrl: 'login/signin-complejo.html',
                        controller: 'loginClubController'
                }
                }
            })
        .state('signupComplejo', {
            url: '/signupComplejo',
            views: {
                'content': {
                    templateUrl: 'register/signup-complejo.html',
                    controller: 'registerClubController'
                }                
            }
        });
    
            $urlRouterProvider.otherwise('/');

    })
    .directive('ngFootbookingheader', function() {
        return {
            restrict: 'E',
            require: '^ngModel',
            templateUrl: 'templates/header.html'
        }
    })
    .directive('ngFootbookingfooter', function() {
        return {
            restrict: 'E',
            require: '^ngModel',
            templateUrl: 'templates/footer.html'
        }
    });