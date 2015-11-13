"use strict";

(function() {
	angular
		.module("FormBuilderApp")
		.controller("ProfileController", ProfileController);
		
	function ProfileController($rootScope, UserService) {
		var model = this;
		var currentUser = $rootScope.user;
		
		model.update = update;
		model.username = currentUser.username;
		model.password = currentUser.password;
		model.firstName = currentUser.firstName;
		model.lastName = currentUser.lastName;
		model.email = currentUser.email;
		

		function update() {
			currentUser.username = model.username;
			currentUser.password = model.password;
			currentUser.firstName = model.firstName;
			currentUser.lastName = model.lastName;
			currentUser.email = model.email;
			$rootScope.user = currentUser;
			
			UserService.updateUser(currentUser.id, currentUser)
		}
	}
})();