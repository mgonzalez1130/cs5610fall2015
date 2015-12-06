"user strict";

(function() {
	angular
		.module("FinalProject")
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
				if (response == null){
					model.errorMessage = "User already exists";
				} else {
					$rootScope.currentUser = response;
					$location.url("/profile");
				}
			});
		}
	}
})();