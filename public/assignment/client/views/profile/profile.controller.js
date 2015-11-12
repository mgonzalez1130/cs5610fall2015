"use strict";

(function() {
	angular
		.module("FormBuilderApp")
		.controller("ProfileController", ProfileController);
		
	function ProfileController($scope, $rootScope, UserService) {
		var currentUser = $rootScope.user;
		$scope.username = currentUser.username;
		$scope.password = currentUser.password;
		$scope.first_name = currentUser.first_name;
		$scope.last_name = currentUser.last_name;
		$scope.email = currentUser.email;
		
		$scope.update = update;
		function update() {
			currentUser.username = $scope.username;
			currentUser.password = $scope.password;
			currentUser.first_name = $scope.first_name;
			currentUser.last_name = $scope.last_name;
			currentUser.email = $scope.email;
			$rootScope.user = currentUser;
			
			UserService.updateUser(currentUser.id, currentUser, UpdateCallback)
		}
		
		function UpdateCallback(user){
			
		}
	}
})();