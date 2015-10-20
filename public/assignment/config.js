"use strict";

(function() {
	angular
		.module("FormBuilderApp")
		.config(function($routeProvider) {
			$routeProvider
				.when("/", {
					templateUrl: "home.view.html"
				})
				.otherwise({
					redirectTo: "/"
				});
		});
})();