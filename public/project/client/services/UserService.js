"use strict";

(function() {
	angular
		.module("FinalProject")
		.factory("UserService", UserService);
		
	function UserService($http, $q) {
		var service = {
			findUserById : findUserById,
			findUserByUsernameAndPassword : findUserByUsernameAndPassword,
			findAllUsers : findAllUsers,
			createUser : createUser,
			deleteUserById : deleteUserById,
			updateUser : updateUser,
			followUser : followUser,
			unfollowUser : unfollowUser,
			addPost : addPost,
			deletePost : deletePost,
			addComment : addComment,
			deleteComment : deleteComment
		};
		return service;
		
		function findUserById(userId) {
			var deferred = $q.defer();
			$http.get("/api/project/user/"+userId)
			.success(function(response) {
				deferred.resolve(response);
			});
			return deferred.promise;
		}
		
		function findUserByUsernameAndPassword(username, password) {
			var deferred = $q.defer();
			
			$http.get("/api/project/user?username="+username+"&password="+password)
			.success(function(response) {
				deferred.resolve(response);
			});
			
			return deferred.promise;
		}
		
		function findAllUsers() {
			var deferred = $q.defer();
			
			$http.get("/api/project/user")
			.success(function(response) {
				deferred.resolve(response);
			});
				
			return deferred.promise;
		}
		
		function createUser(user) {
			var deferred = $q.defer();
			
			$http.post("/api/project/user", user)
			.success(function(response) {
				deferred.resolve(response);
			});
			
			return deferred.promise;
		}
		
		function deleteUserById(id){
			var deferred = $q.defer();
			
			$http.delete("/api/project/user/"+id)
			.success(function(response) {
				deferred.resolve(response);
			});
			
			return deferred.promise;
		}
		
		function updateUser(id, user) {
			var deferred = $q.defer();
			
			$http.put("/api/project/user/"+id, user)
			.success(function(response){
				deferred.resolve(response);
			});
			
			return deferred.promise;
		}
		
		function followUser(followerId, followedId) {
			var deferred = $q.defer();
			
			$http.put("/api/project/user/"+followerId+"/follow/"+followedId)
			.success(function(response){
				deferred.resolve(response);
			});
			
			return deferred.promise;
		}
		
		function unfollowUser(followerId, followedId) {
			var deferred = $q.defer();
			$http.put("/api/project/user/"+followerId+"/unfollow/"+followedId)
			.success(function(response){
				deferred.resolve(response);
			});
			return deferred.promise;
		}
		
		function addPost(userId, postId) {
			var deferred = $q.defer();
			$http.put("/api/project/user/"+userId+"/post/"+postId+"/add")
			.success(function(response){
				deferred.resolve(response);
			});
			return deferred.promise;
		}
		
		function deletePost(userId, postId) {
			var deferred = $q.defer();
			$http.put("/api/project/user/"+userId+"/post/"+postId+"/delete")
			.success(function(response){
				deferred.resolve(response);
			});
			return deferred.promise;
		}
		
		function addComment(userId, commentId) {
			var deferred = $q.defer();
			$http.put("/api/project/user/"+userId+"/comment/"+commentId+"/add")
			.success(function(response){
				deferred.resolve(response);
			});
			return deferred.promise;
		}
		
		function deleteComment(userId, commentId) {
			var deferred = $q.defer();
			$http.put("/api/project/user/"+userId+"/comment/"+commentId+"/delete")
			.success(function(response){
				deferred.resolve(response);
			});
			return deferred.promise;
		}
				
		function voteComment(userId, commentId) {
			var deferred = $q.defer();
			
			$http.put("/api/project/user/"+userId+"/comment/"+commentId+"/vote")
			.success(function(response){
				deferred.resolve(response);
			});
			
			return deferred.promise;
		}
		
		function votePost(userId, postId) {
			var deferred = $q.defer();
			
			$http.put("/api/project/user/"+userId+"/post/"+postId+"/vote")
			.success(function(response){
				deferred.resolve(response);
			});
			
			return deferred.promise;
		}
	}
})();