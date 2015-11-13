"use strict";

(function() {
	angular
		.module("FormBuilderApp")
		.controller("ProfileController", ProfileController);
		
	function ProfileController($scope, $rootScope, UserService) {
		var currentUser = $rootScope.user;
		$scope.username = currentUser.username;
		$scope.password = currentUser.password;
		$scope.firstName = currentUser.firstName;
		$scope.lastName = currentUser.lastName;
		$scope.email = currentUser.email;
		
		$scope.update = update;
		function update() {
			currentUser.username = $scope.username;
			currentUser.password = $scope.password;
			currentUser.firstName = $scope.firstName;
			currentUser.lastName = $scope.lastName;
			currentUser.email = $scope.email;
			$rootScope.user = currentUser;
			
			UserService.updateUser(currentUser.id, currentUser)
		}
	}
})();