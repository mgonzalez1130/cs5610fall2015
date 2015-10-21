"use strict";

(function() {
	angular
		.module("FormBuilderApp")
		.config(function($routeProvider) {
			$routeProvider
				.when("/home", {
					templateUrl: "home.view.html"
				})
				.when("/login", {
					templateUrl: "login.view.html",
					controller: "LoginController"
				})
				.when("/register", {
					templateUrl: "register.view.html",
					controller: "RegisterController"
				})
				.when("/profile", {
					templateUrl: "profile.view.html",
					controller: "ProfileController"
				})
				.when("/form", {
					templateUrl: "form.view.html",
					controller: "FormController"
				})
				.otherwise({
					redirectTo: "/home"
				});
		});
})();