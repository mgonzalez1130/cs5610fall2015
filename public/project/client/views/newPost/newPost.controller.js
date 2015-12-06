(function(){
	angular
		.module("FinalProject")
		.controller("NewPostController", NewPostController);
		
	function NewPostController($rootScope, $location, PostService, UserService) {
		var model = this;
		var newPost = { tags: [] };
		model.newPost = newPost;
		model.submit = submit;
		model.addNewTag = addNewTag;
		
		function addNewTag() {
			var tags = model.newTag.split(" ");
			for (var i=0; i<tags.length; i++) {
				if (model.newPost.tags.indexOf(tags[i]) < 0){
					model.newPost.tags.push(tags[i].toLowerCase());	
				}					
			}
		}

		function submit() {
			if (!model.newPost.title) {
				model.errorText = "Please give your post a title";				
			} else if (!model.newPost.description) {
				model.errorText = "Please provide a short description for your post";
			} else if (!model.newPost.url) {
				model.errorText = "Please provide a url to the original article";
			} else if (model.newPost.tags.length == 0) {
				model.errorText = "Please provide at least one tag for your post";
			} else {
				model.newPost.userId = $rootScope.currentUser._id;
				model.newPost.username = $rootScope.currentUser.username;
				PostService.createPost(model.newPost)
				.then(function(post){
					if (post == null){
						model.errorText = "New post failed";
					} else {
						UserService.addPost($rootScope.currentUser._id, post._id)
						.then(function(user){
							$rootScope.currentUser = user;
							$location.url("/post/"+post._id);
						});
					}
				});				
			}
			
			
			

		}
	}	
})();