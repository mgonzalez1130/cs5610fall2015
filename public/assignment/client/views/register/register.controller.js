"user strict";

(function() {
	angular
		.module("FormBuilderApp")
		.controller("RegisterController", RegisterController);
		
	function RegisterController($scope, $rootScope, $location, UserService) {
		var model = this;
		model.register = register;
		
		function register() {
			var newUser = {
				username: model.username,
				password: model.password,
				email: model.email
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