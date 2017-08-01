angular.module('footBookingApp',['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home',
		{url: '/',
		views: {
			'content': {
				templateUrl: 'templates/home.html',
			}/*,
			'header': {
				templateUrl : 'templates/header.html'
			},
			'footer' : {
				templateUrl : 'templates/footer.html'
			}*/
		}
	})
	.state('loginComplejo', 
		{url: '/signinComplejo',
		views: {
			'content': {
				templateUrl: 'templates/signin-complejo.html',
				controller: LoginClubController}
		}});
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