"user strict";

(function() {
	angular
		.module("FormBuilderApp")
		.controller("RegisterController", RegisterController);
		
	function RegisterController($scope, $rootScope, $location, UserService) {
		$scope.register = register;
		function register() {
			var newUser = {
				username: $scope.username,
				password: $scope.password,
				email: $scope.email
			};
			UserService.createUser(newUser, registerCallback);
		}
		
		function registerCallback(user) {
			if (user != null) {
				$rootScope.user = user;
				$location.url("/profile");
			} else {
				console.log("User not successfully created");
			}
		}
	}
})();