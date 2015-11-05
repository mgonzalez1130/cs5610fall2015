"use strict";

(function() {
	angular
		.module("FinalProject")
		.controller("PostsController", PostsController);
		
	function PostsController($scope, $location) {
		$scope.$location = $location;
	}
	
})();