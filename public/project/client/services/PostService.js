"use strict";

(function() {
	angular
		.module("FinalProject")
		.factory("PostService", PostService);
		
	function PostService($http, $q) {
		var service = {
			findAllPosts : findAllPosts,
			findPostById : findPostById,
			findPostsByUserId : findPostsByUserId,
			findPostsByTag : findPostsByTag,
			createPost : createPost,
			deletePost : deletePost,
			updatePost : updatePost 
		};
		return service;
		
		function findAllPosts() {
			var deferred = $q.defer();
			
			$http.get("/api/project/post")
			.success(function(posts){
				deferred.resolve(posts);
			});
			
			return deferred.promise;
		}
		
		function findPostById(postId) {
			var deferred = $q.defer();
			
			$http.get("/api/project/post/"+postId)
			.success(function(post){
				deferred.resolve(post);
			});
			
			return deferred.promise;
		}
		
		function findPostsByUserId(userId) {
			var deferred = $q.defer();
			
			$http.get("/api/project/user/"+userId+"/post")
			.success(function(posts){
				deferred.resolve(posts);
			});
			
			return deferred.promise;
		}
		
		function findPostsByTag(tag) {
			var deferred = $q.defer();
			
			$http.get("/api/project/post?tag="+tag)
			.success(function(posts){
				deferred.resolve(posts);
			});
			
			return deferred.promise;
		}
		
		function createPost(post) {
			var deferred = $q.defer();
			
			$http.post("/api/project/post", post)
			.success(function(post){
				deferred.resolve(post);
			});
			
			return deferred.promise;
		}
		
		function deletePost(postId) {
			var deferred = $q.defer();
			
			$http.delete("/api/project/post/"+postId)
			.success(function(response){
				deferred.resolve(response);
			});
			
			return deferred.promise;
		}
		
		function updatePost(postId, post) {
			var deferred = $q.defer();
			
			$http.put("/api/project/post/"+postId, post)
			.success(function(post){
				deferred.resolve(post);
			});
			
			return deferred.promise;
		}
		
		function addComment(postId, comment) {
			var deferred = $q.defer();
			
			$http.put("/api/project/post/"+postId+"/comment", comment)
			.success(function(post){
				deferred.resolve(post);
			});
			
			return deferred.promise;
		}
		
		function removeComment(postId, commentId) {
			var deferred = $q.defer();
			
			$http.put("/api/project/post/"+postId+"/comment/"+commentId)
			.success(function(post){
				deferred.resolve(post);
			});
			
			return deferred.promise;
		}
	}
})();