"use strict";

(function() {
	angular
		.module("FormBuilderApp")
		.controller("LoginController", LoginController);
		
	function LoginController($scope, $rootScope, $location, UserService) {
		$scope.Login = Login;
		function Login() {
			UserService.findUserByUsernameAndPassword($scope.username, $scope.password)
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