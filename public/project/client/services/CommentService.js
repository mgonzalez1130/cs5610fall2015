"use strict";

(function() {
		angular
		.module("FinalProject")
		.factory("CommentService", CommentService);
		
	function CommentService($http, $q) {
		var service = {
			findAllComments : findAllComments,
			findCommentById : findCommentById,
			findCommentsByUserId : findCommentsByUserId,
			findCommentsByPostId : findCommentsByPostId,
			createComment : createComment,
			deleteComment : deleteComment,
			updateComment : updateComment 
		};
		return service;
		
		function findAllComments() {
			var deferred = $q.defer();
			
			$http.get("/api/project/comment")
			.success(function(comments){
				deferred.resolve(comments);
			});
			
			return deferred.promise;
		}
		
		function findCommentById(commentId) {
			var deferred = $q.defer();
			
			$http.get("/api/project/comment/"+commentId)
			.success(function(comment){
				deferred.resolve(comment);
			});
			
			return deferred.promise;
		}
		
		function findCommentsByUserId(userId) {
			var deferred = $q.defer();
			
			$http.get("/api/project/user/"+userId+"/comment")
			.success(function(comments){
				deferred.resolve(comments);
			});
			
			return deferred.promise;
		}
		
		function findCommentsByPostId(postId) {
			var deferred = $q.defer();
			
			$http.get("/api/project/post/"+postId+"/comment")
			.success(function(comments){
				deferred.resolve(comments);
			});
			
			return deferred.promise;
		}
		
		//Creates a new comment. Remember to add that comment
		//to the post the comment corresponds to using the PostService
		function createComment(comment) {
			var deferred = $q.defer();
			
			$http.post("/api/project/comment", comment)
			.success(function(comments){
				deferred.resolve(comments);
			});
			
			return deferred.promise;
		}
		
		function deleteComment(commentId) {
			var deferred = $q.defer();
			
			$http.delete("/api/project/comment/"+commentId)
			.success(function(comments){
				deferred.resolve(comments);
			});
			
			return deferred.promise;
		}
		
		function updateComment(commentId, comment) {
			var deferred = $q.defer();
			
			$http.put("/api/project/comment/"+commentId, comment)
			.success(function(comments){
				deferred.resolve(comments);
			});
			
			return deferred.promise;
		}
	}
})();