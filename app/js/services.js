angular.module('F1FeederApp.services', [])
	// $http tells Angular’s dependency injection engine that our new service requires (or depends on) the $http service
	.factory('ergastAPIservice', function($http) {
	
		var ergastAPI = {};
	
		ergastAPI.getDrivers = function() {
			return $http({
				method: 'JSONP', 
				url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
		});
		
	}
	
	ergastAPI.getDriverDetails = function(id) {
		return $http({
			method: 'JSONP', 
			url: 'http://ergast.com/api/f1/2013/drivers/'+ id +'/driverStandings.json?callback=JSON_CALLBACK'
		});
	}
	
	ergastAPI.getDriverRaces = function(id) {
		return $http({
			method: 'JSONP', 
			url: 'http://ergast.com/api/f1/2013/drivers/'+ id +'/results.json?callback=JSON_CALLBACK'
		});
	}
	
	return ergastAPI;
	
	});
