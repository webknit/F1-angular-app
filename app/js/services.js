// Registering the services module
angular.module('F1FeederApp.services', [])

	// The Factory recipe adds the following abilities:
	//		ability to use other services (have dependencies)
    //		service initialisation
    //		delayed/lazy initialisation

	// $http tells Angular’s dependency injection engine that our new service requires (or depends on) the $http service
	.factory('ergastAPIservice', function($http) {
	
		// Create object
		var ergastAPI = {};
	
		// The following adds a function to the ergastAPI object
		ergastAPI.getDrivers = function() {
			return $http({
				method: 'JSONP', 
				url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
		});
		
	}
	
	// Passes the driverDetails func on
	ergastAPI.getDriverDetails = function(id) {
		return $http({
			method: 'JSONP', 
			url: 'http://ergast.com/api/f1/2013/drivers/'+ id +'/driverStandings.json?callback=JSON_CALLBACK'
		});
	}
	
	// Passes the driverRaces func on
	ergastAPI.getDriverRaces = function(id) {
		return $http({
			method: 'JSONP', 
			url: 'http://ergast.com/api/f1/2013/drivers/'+ id +'/results.json?callback=JSON_CALLBACK'
		});
	}
	
	
	//console.log(ergastAPI);
	
	// Returns the ergastAPI object with the functions inside
	return ergastAPI;
	
	});
