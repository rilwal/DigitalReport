(function (angular) {
	var app = angular.module("ReportApp", ['ngRoute']);

	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'templates/home.html'
			})
			.when('/brief', {
				templateUrl: 'templates/brief.html'
			})
			.when('/evidence', {
				templateUrl: 'templates/evidence.html'
			})
			.when('/plan', {
				templateUrl: 'templates/plan.html',
				controller: 'planCtrl'
			})
			.when('/feedback', {
				templateUrl: 'templates/feedback.html',
				controller: 'FeedbackCtrl'
			});

		$locationProvider.html5Mode(true);
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

	app.controller('MusicCtrl', ['$scope', '$http', function ($scope, $http) {

		var player = $("#player")[0];

		player.addEventListener("canplay", function() { player.addEventListener("canplay", function (e) { e.target.play(); })});

		player.addEventListener('ended', function () {
			console.log("song ended");
			console.log($scope);
			$scope.$apply($scope.setSong($scope.playing + 1));
		});

		$scope.isActive = function (song) {
			return song == $scope.playing;
		};

		$scope.setSong = function(song) {
			$scope.playing = song;
			$scope.file = $scope.base + $scope.songs[song].file;
		}

		$http.get('/music/album.json').then(function(response) {
			$scope.base = response.data.base;
			$scope.songs = response.data.songs;

			$scope.setSong(0);

		});

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

		$scope.$on("$routeChangeSuccess", function () {
			setTimeout(function () {
			$('pre code').each(function(i, block) {
   				hljs.highlightBlock(block);
  			});
			}, 10);
		});

	}])

	app.controller('planCtrl', function () {
		var targets = {
			"home": {
				"image": "title.webp",
				"map": "titlemap"
			},
			"levelselect": {
				"image": "levelselect.webp",
				"map": "levelselectmap"
			},
			"level": {
				"image": "in-game.webp",
				"map": "levelmap"
			},
			"levelfinish": {
				"image": "level-win.webp",
				"map": "winmap"
			},
			"options": {
				"image": "options.webp",
				"map": "optionsmap"
			},
			"controls": {
				"image" :"controls.webp",
				"map": "controlsmap"
			}
		}


		var image = document.getElementById("plan"),
			areas = document.getElementsByTagName("area"),
			quit = document.getElementById("quit");

		function setTarget(name) {
			var target = targets[name];
			image.style.backgroundImage = "url(img/" + target.image + ")";
			image.setAttribute("usemap", target.map);
		}

		for (var i = 0; i < areas.length; i++) {
			var a = areas[i];

			if (a.getAttribute("data-target")) {
				a.addEventListener("click", function (e) {
					e.preventDefault();
					setTarget(e.target.getAttribute("data-target"));
				});
			}
		}

		quit.addEventListener("click", function (e) {
			e.preventDefault();
			history.go(-1);
		})
		setTarget("home");
	});
})(angular);