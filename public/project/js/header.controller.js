"use strict";

(function() {
	angular
		.module("FinalProject")
		.controller("HeaderController", HeaderController);
		
	function HeaderController($scope, $location) {
		$scope.$location = $location;
	}
	
})();