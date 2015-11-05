"use strict";

(function() {
	angular
		.module("FinalProject")
		.controller("PostDetailsController", PostDetailsController);
		
	
	function PostDetailsController($scope, $location) {
		$("#tabs").tabs();
	}
	
})();