angular.module('footBookingApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    'content': {
                        templateUrl: 'templates/home.html',
                    }
                }
            })

            .state('loginComplejo', {
                url: '/signinComplejo',
                views: {
                    'content': {
                        templateUrl: 'templates/signin-complejo.html',
                        controller: loginClubController
                    }
                }
            });
        .state('singupComplejo', {
            url: '/singupComplejo',
            view: {
                'content': {
                    templateUrl: 'templates/singup-complejos.html',
                    controller: 'registerClubController'
                }                
            }
        });
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