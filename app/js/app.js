// Fires the app up

// initialise our app and register the modules on which it depends
angular.module('F1FeederApp', [
	'F1FeederApp.services',
	'F1FeederApp.controllers',
	'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when("/drivers", {templateUrl: "partials/drivers.html", controller: "driversController"}).
	when("/teams", {templateUrl: "partials/teams.html", controller: "teamsController"}).
	when("/teams/:id", {templateUrl: "partials/teams-races.html", controller: "teamsRacesController"}).
	when("/drivers/:id", {templateUrl: "partials/driver.html", controller: "driverController"}).
	otherwise({redirectTo: '/drivers'});
}]);