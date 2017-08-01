angular.module('footBookingApp')
.service('authSvc', function($http, $window){
	this.saveToken = function (token) {
      $window.localStorage['complejo-token'] = token;
    };

    this.getToken = function () {
      return $window.localStorage['complejo-token'];
    };

    this.logout = function() {
      $window.localStorage.removeItem('mean-token');
    };
});