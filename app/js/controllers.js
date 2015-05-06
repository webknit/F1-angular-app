// Controllers

angular.module('F1FeederApp.controllers', []).
	
	// When a Controller is attached to the DOM via the ng-controller directive, Angular will instantiate a new Controller object, using the specified
	// Controller's constructor function
	// $scope variable is supposed to link your controller and views, it holds all the data that will be used within your template.
	// Also passing in the ergastAPIservice function
	controller('driversController', function($scope, ergastAPIservice) {
	
		// reset the nameFilter as only needed on search
		$scope.nameFilter = null;
		
		// Create array for the driversList
		$scope.driversList = [];
		
		// driver passes in the drivers objects
		// This is called from filter: searchFilter in the ng-repeat
		$scope.searchFilter = function (driver) {
			
			// Returns a regExp, eg "vet" search would return /vet/i
			var re = new RegExp($scope.nameFilter, 'i');
			
			// test - Tests for a match in a string. Returns true or false
			return !$scope.nameFilter || re.test(driver.Driver.givenName) || re.test(driver.Driver.familyName);
			
		};
	
		// Calls the stored driver function
		ergastAPIservice.getDrivers().success(function (response) {
		
			//Digging into the response to get the relevant data
			$scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
			
		});
		
	}).
	
	// Driver controller, sorts the individual pages
	// Additional $routeParams passed in here
	// The $routeParams service allows you to retrieve the current set of route parameters (requires the ngRoute module to be installed)
	controller('driverController', function($scope, $routeParams, ergastAPIservice) {
	
		// Get the ID of the driver
		$scope.id = $routeParams.id;
		
		$scope.races = [];
		$scope.driver = null;
	
		ergastAPIservice.getDriverDetails($scope.id).success(function (response) {
			$scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
			console.log($scope.driver);
			
		});
	
		ergastAPIservice.getDriverRaces($scope.id).success(function (response) {
			$scope.races = response.MRData.RaceTable.Races; 
		});
		 
	}).
	
	controller('teamsController', function($scope, ergastAPIservice) {
	
		$scope.teamList = [];
	
		// Calls the stored driver function
		ergastAPIservice.getTeams().success(function (response) {
		
			//Digging into the response to get the relevant data
			$scope.teamList = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
			
			console.log($scope.teamList);
			
		});
		 
	}).
	
	controller('teamsRacesController', function($scope, $routeParams, ergastAPIservice) {
	
		$scope.teamFilter = null;
	
		$scope.id = $routeParams.id;
	
		$scope.teamRacesList = [];
		
		$scope.teamFilter = function (team) {
			
			// Returns a regExp, eg "vet" search would return /vet/i
			var re = new RegExp($scope.teamFilter, 'i');
			
			// test - Tests for a match in a string. Returns true or false
			return !$scope.teamFilter || re.test(team.Constructor.name);
			
		};
	
		// Calls the stored driver function
		ergastAPIservice.getTeamsRaces($scope.id).success(function (response) {
		
			//Digging into the response to get the relevant data
			$scope.teamRacesList = response.MRData.RaceTable.Races;
			
			console.log($scope.teamRacesList);
			
		});
		 
	});