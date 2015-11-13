"use strict";

(function() {
	angular
		.module("FormBuilderApp")
		.controller("LoginController", LoginController);
		
	function LoginController($rootScope, $location, UserService) {
		var model = this;
		model.Login = Login;
		
		function Login() {
			UserService.findUserByUsernameAndPassword(model.username, model.password)
			.then(function(response){
				LoginResponse(response);
			});
		}
		
		function LoginResponse(user) {
			if (user != null) {
				$rootScope.user = user;
				$location.url("/profile");
			} else {
				console.log("Could not find user");
			}
		}
	}
	
})();