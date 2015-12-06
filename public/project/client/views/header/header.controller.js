"use strict";

(function() {
	angular
		.module("FinalProject")
		.controller("HeaderController", HeaderController);
		
	function HeaderController($scope, $location, $rootScope) {
		var model = this;
		$scope.$location = $location;
		
		model.logout = logout;
		function logout() {
			$rootScope.currentUser = null;
			$location.url("/home");
		}
	}
	
})();