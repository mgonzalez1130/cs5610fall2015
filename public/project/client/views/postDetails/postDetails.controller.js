"use strict";

(function() {
	angular
		.module("FinalProject")
		.controller("PostDetailsController", PostDetailsController);
		
	
	function PostDetailsController($routeParams, $rootScope, $window, $location, PostService, CommentService) {
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
		model.externalLink = externalLink;		
		
		function submitComment(){
			if (model.newComment.text == ""){
				model.errorText = "You didn't write anything!";
			} else if (!(model.newComment.isOpinion ||model.newComment.isProof || model.newComment.isDisproof)) {
				model.errorText = "Is this post an opinion, proof, or disproof?";
			} else {
				model.newComment.userId = $rootScope.currentUser._id;
				model.newComment.username = $rootScope.currentUser.username;
				console.log(model.newComment);	
			}
		}
		
		function externalLink() {
			$window.open(model.post.url);
		}
	}
	
})();