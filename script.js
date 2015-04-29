angular.module('F1FeederApp.controllers', []).
	controller('driversController', function($scope, ergastAPIservice) {
	
		$scope.nameFilter = null;
		$scope.driversList = [];
		
		$scope.searchFilter = function (driver) {
			var keyword = new RegExp($scope.nameFilter, 'i');
			return !$scope.nameFilter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
		};
	
		ergastAPIservice.getDrivers().success(function (response) {
			//Dig into the responde to get the relevant data
			$scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
		});
	    
	});


angular.module('F1FeederApp.services', []).
	// $http tells Angular’s dependency injection engine that our new service requires (or depends on) the $http service
	factory('ergastAPIservice', function($http) {
	
	var ergastAPI = {};
	
	ergastAPI.getDrivers = function() {
		return $http({
			method: 'JSONP', 
			url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
		});
	}
	
	return ergastAPI;
	
	});

// initialize our app and register the modules on which it depends
angular.module('F1FeederApp', [
	'F1FeederApp.controllers',
	'F1FeederApp.services',
	'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/drivers", {templateUrl: "partials/drivers.html", controller: "driversController"}).
	when("/drivers/:id", {templateUrl: "partials/driver.html", controller: "driverController"}).
	otherwise({redirectTo: '/drivers'});
}]);