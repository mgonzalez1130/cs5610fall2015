"use strict";

(function() {
	angular
		.module("FinalProject")
		.controller("LoginController", LoginController);
		
	function LoginController($rootScope, $location, UserService) {
		var model = this;
		model.Login = Login;
		
		function Login() {
			UserService.findUserByUsernameAndPassword(model.username, model.password)
			.then(function(response){
				if (response == null) {
					model.errorMessage = "User not found";
				} else {
					$rootScope.currentUser = response;
					$location.url("/profile");
				}
			});
		}
	}
	
})();