module.exports = function(app, PostModel){
	
	//find and return posts by tag if a tag is provided via a query,
	//otherwise return all posts
	app.get("/api/project/post", function(req, res){
		if (req.query.tag) {
			var tag = req.query.tag;
			PostModel.findPostsByTag(tag).then(function(posts){
				res.json(posts);
			});
		} else {
			PostModel.findAllPosts().then(function(posts){
				res.json(posts);
			});
		}
	});
	
	//find and return post by id
	app.get("/api/project/post/:id", function(req, res){
		var postId = req.params.id;
		PostModel.findPostById(postId).then(function(post){
			res.json(post);
		});
	});
	
	//return all posts by user
	app.get("/api/project/user/:userId/post", function(req, res){
		var userId = req.params.userId;
		PostModel.findPostsByUserId(userId).then(function(posts){
			res.json(posts);
		});
	});
	
	//create a new post, return the new post
	app.post("/api/project/post", function(req, res){
		var post = req.body;
		PostModel.createPost(post).then(function(post){
			res.json(post);
		});
	});
	
	//delete a post, returns nothing
	app.delete("/api/project/post/:id", function(req, res){
		var postId = req.params.id;
		PostModel.deletePost(postId).then(function(result){
			res.json(result);
		});
	});
	
	//update a post, returns the new post
	app.put("/api/project/post/:id", function(req, res){
		var postId = req.params.id;
		var post = req.body;
		PostModel.updatePost(postId, post).then(function(post){
			res.json(post);
		});
	});
	
	//adds a comment to the list of comments for a post
	app.put("/api/project/post/:id/comment", function(req, res){
		var postId = req.params.id;
		var comment = req.body;
		PostModel.addComment(postId, comment).then(function(post){
			res.json(post);
		});
	});
	
	//removes a comment from all comment lists for a post
	app.put("/api/project/post/:postId/comment/:commentId", function(req, res){
		var postId = req.params.postId;
		var commentId = req.params.commentId;
		PostModel.removeComment(postId, commentId).then(function(post){
			res.json(post);
		});
	});
	
}