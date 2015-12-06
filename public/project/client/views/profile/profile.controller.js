"use strict";

(function() {
	angular
		.module("FinalProject")
		.controller("ProfileController", ProfileController);
		
	function ProfileController($rootScope, UserService, PostService) {
		var model = this;
		model.user = $rootScope.currentUser;
		
		model.update = update;
		model.unfollowUser = unfollowUser;
		model.deletePost = deletePost;

		function update() {
			UserService.updateUser($rootScope.currentUser._id, model.user)
			.then(function(response){
				$rootScope.currentUser = response;
				model.updateText = "Your profile has been updated";
			});
		}
		
		function unfollowUser(userIndex) {
			var user = $rootScope.currentUser.following[userIndex];
			UserService.unfollowUser($rootScope.currentUser._id, user._id)
			.then(function(response){
				$rootScope.currentUser = response;
			});
		}
		
		function deletePost(postIndex){
			var post = $rootScope.currentUser.posts[postIndex];
			PostService.deletePost(post._id)
			.then(function(response){
				UserService.deletePost($rootScope.currentUser._id, post._id)
				.then(function(response){
					$rootScope.currentUser = response;
				});
			});
		}
	}
})();