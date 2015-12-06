"use strict";

(function() {
	angular
		.module("FinalProject")
		.controller("PostDetailsController", PostDetailsController);
		
	
	function PostDetailsController($routeParams, $rootScope, $window, $location, PostService, CommentService, UserService) {
		$("#tabs").tabs();
		var postId = $routeParams.postId;
		var model = this;
		PostService.findPostById(postId).then(function(response){
			model.post = response;
		});
		
		var newComment = {
			postId : postId,
			text : "", 
			isOpinion : false, 
			isProof : false, 
			isDisproof : false};
		model.newComment = newComment;	
		model.submitComment = submitComment;
		model.deleteComment = deleteComment;
		model.editComment = editComment;
		model.addNewTag = addNewTag;
		model.updatePost = updatePost;
		model.deletePost = deletePost;
		model.externalLink = externalLink;		
		
		function submitComment(){
			if (model.newComment.text == ""){
				model.errorText = "You didn't write anything!";
			} else if (!(model.newComment.isOpinion ||model.newComment.isProof || model.newComment.isDisproof)) {
				model.errorText = "Is this post an opinion, proof, or disproof?";
			} else {
				model.newComment.userId = $rootScope.currentUser._id;
				model.newComment.username = $rootScope.currentUser.username;
				model.newComment.updated = Date.now();
				CommentService.createComment(model.newComment)
				.then(function(comment){
					PostService.addComment(postId, comment).then(function(post){
						model.post = post;
						model.newComment = {
							postId : postId,
							text : "", 
							isOpinion : false, 
							isProof : false, 
							isDisproof : false
						};
						UserService.addComment(comment.userId, comment._id).then(function(user){
							$rootScope.currentUser = user;
						});
					});
				});
			}
		}
		
		function deleteComment(commentIndex, commentType) {
			var commentId;
			if (commentType == 'opinion') {
				commentId = model.post.opinions[commentIndex]._id;
			} else if (commentType == 'proof') {
				commentId = model.post.proof[commentIndex]._id;
			} else {
				commentId = model.post.disproof[commentIndex]._id;
			}
			CommentService.deleteComment(commentId).then(function(comment){
				PostService.removeComment(postId, commentId).then(function(post){
					model.post = post;
					UserService.deleteComment($rootScope.currentUser._id, commentId);
				});
			});
		}
		
		function editComment(commentIndex, commentType) {
			if (commentType == 'opinion') {
				model.newComment = model.post.opinions[commentIndex];
			} else if (commentType == 'proof') {
				model.newComment = model.post.proof[commentIndex];
			} else {
				model.newComment = model.post.disproof[commentIndex];
			}
			deleteComment(commentIndex, commentType);
		}
		
		function addNewTag() {
			var tags = model.newTag.split(" ");
			for (var i=0; i<tags.length; i++) {
				if (model.post.tags.indexOf(tags[i]) < 0){
					model.post.tags.push(tags[i].toLowerCase());	
				}					
			}			
		}
		
		function updatePost() {
			PostService.updatePost(model.post._id, model.post).then(function(result){
				model.post = result;
				model.errorText = "Post has been updated";
			});
		}
		
		function deletePost() {
			var postId = model.post._id;
			var userId = model.post.userId;
			PostService.deletePost(postId).then(function(result){
				UserService.deletePost(userId, postId).then(function(user){
					$rootScope.currentUser = user;
					$location.url("/home");
				});
			});
		}
		
		function externalLink() {
			$window.open(model.post.url);
		}
	}
	
})();