(function(){
	angular	
		.module("FinalProject")
		.controller("PublicProfileController", PublicProfileController);
		
	function PublicProfileController($rootScope, $location, $routeParams, UserService) {
		var model = this;
		model.followUser = followUser;
		model.deleteUser = deleteUser;
		
		var userId = $routeParams.userId;
		displayUser();
		
		function followUser() {
			if ($rootScope.currentUser._id == userId) {
				model.errorText = "You can't follow yourself!";
			} else if (alreadyFollowing()){
				model.errorText = "You are already following this user!";
			} else {
				UserService.followUser($rootScope.currentUser._id, userId)
				.then(function(response){
					$rootScope.currentUser = response;
					model.errorText = "You are now following this user!"
				});
			}
		}
		
		function displayUser() {
			UserService.findUserById(userId).then(function(response){
				model.user = response;
			});
		}
		
		function alreadyFollowing() {
			for (var index in $rootScope.currentUser.following) {
				if ($rootScope.currentUser.following[index]._id == userId) {
					return true;
				}
			}
			return false;
		}
		
		function deleteUser() {
			if ($rootScope.currentUser.isModerator) {
				UserService.deleteUserById(userId).then(function(response){
					$location.url("/home");
				});
			} else {
				$location.url("/home");
			}
		}
	}
})();