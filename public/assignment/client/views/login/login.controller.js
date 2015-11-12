"use strict";

(function() {
	angular
		.module("FormBuilderApp")
		.controller("LoginController", LoginController);
		
	function LoginController($scope, $rootScope, $location, UserService) {
		$scope.Login = Login;
		function Login() {
			UserService.findUserByUsernameAndPassword($scope.username, $scope.password, LoginCallback);
		}
		
		function LoginCallback(user) {
			if (user != null) {
				$rootScope.user = user;
				$location.url("/profile");
			} else {
				console.log("Could not find user");
			}
		}
	}
	
})();