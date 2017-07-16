/**
 * Created by pablo on 15/7/2017.
 */
angular.module('appFootBooking',[])

    .config(["$stateProvider", "$urlRouterProvider",function($stateProvider, $urlRouterProvider) {

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

        $stateProvider
            .state('signup',
                {url: '/index',
                    views: {
                        'fbcontainer': {
                            templateUrl: './home.html',
                            controller: 'signupController',
                            abstract: false
                        }
                    }
                });


    }()])

    .controller('signupController', function ($scope) {
        $scope.master = "Hola, probando"//{Nombre: name, lastName: lastName, userName: userName, email: email, password: password}
    }());








