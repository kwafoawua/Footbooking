angular.module('footBookingApp',['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.otherwhise('/');

	$stateProvider
	.state('home',
		{url: '/',
		views: {
			'content': {
				templateUrl: 'templates/home.html',
				abstract: false
			}
		}});
});