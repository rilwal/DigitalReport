(function (angular) {
	var app = angular.module("ReportApp", ['ngRoute']);

	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'templates/home.html'
			})
			.when('/brief', {
				templateUrl: 'templates/brief.html'
			})
			.when('/feedback', {
				templateUrl: 'templates/feedback.html',
				controller: 'FeedbackCtrl'
			})
	}]);

	app.directive('navItem', function () {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				url: '=href'
			},
			template: '<li class="nav-item" ng-class="{active: nav.isActive(\'/\')}"><a class="nav-link" href="{{url}}"><span class="ng-transclude"</a></li>'
		}
	})

	app.controller('NavbarCtrl', ['$location', function ($location) {
		this.isActive = function (viewLocation) {
			return viewLocation == $location.path();
		};
	}]);

	app.controller('FeedbackCtrl', ['$scope', function ($scope) {
		$scope.stakeholders = [

		{
			'name': 'Daniel Alexander',
			'steam': 'http://steamcommunity.com/id/Xwing669',
			'steam_pic': 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/09/0997ad25d0d06dc1f9df5fd15df2b45f0fbac4eb_full.jpg',
			'role': 'Level Editor'
		},
		{
			'name': 'Alfie Hamilton',
			'steam': 'http://steamcommunity.com/id/RapeyDolphin27',
			'steam_pic': 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/d0/d0f1cbdff9fe50c955b44c673416ee5d1233f9cc_full.jpg',
			'role': 'Gamer / End User'
		}];
	}]);

	app.controller('ReportCtrl', ['$scope', function($scope){
		$scope.pi = 3.14159;
	}])
})(angular);