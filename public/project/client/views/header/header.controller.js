"use strict";

(function() {
	angular
		.module("FinalProject")
		.controller("HeaderController", HeaderController);
		
	function HeaderController($scope, $location, $rootScope) {
		var model = this;
		$scope.$location = $location;
		
		model.logout = logout;
		model.search = search;
		function logout() {
			$rootScope.currentUser = null;
			$location.url("/home");
		}
		
		function search() {
			var text = model.searchText;
			model.searchText = "";			
			$location.url("/search/"+text);
		}
	}
	
})();