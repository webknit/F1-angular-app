angular.module('F1FeederApp.controllers', []).
	controller('driversController', function($scope, ergastAPIservice) {
	
		$scope.nameFilter = null;
		$scope.driversList = [];
	
		ergastAPIservice.getDrivers().success(function (response) {
			//Dig into the responde to get the relevant data
			$scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
		});
	
		// The $scope variable is supposed to link your controller and views
		// it holds all the data that will be used within your template
	    /*
			$scope.driversList = [
		      {
		          Driver: {
		              givenName: 'Sebastian',
		              familyName: 'Vettel'
		          },
		          points: 322,
		          nationality: "German",
		          Constructors: [
		              {name: "Red Bull"}
		          ]
		      },
		      {
		          Driver: {
		          givenName: 'Fernando',
		              familyName: 'Alonso'
		          },
		          points: 207,
		          nationality: "Spanish",
		          Constructors: [
		              {name: "Ferrari"}
		          ]
		      }
		    ];
		*/
	    
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
	'F1FeederApp.services'
]);