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
			UserService.createUser(newUser).then(function(response){
				UserService.findUserByUsernameAndPassword(newUser.username, newUser.password)
				.then(function(response){
					$rootScope.user = response;
					$location.url("/profile");
				});
			});
		}
	}
})();