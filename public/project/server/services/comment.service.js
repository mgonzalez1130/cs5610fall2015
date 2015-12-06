module.exports = function(app, CommentModel){
	
	//find all comments
	app.get("/api/project/comment", function(req, res){
		CommentModel.findAllComments().then(function(comments){
			res.json(comments);
		});
	});
	
	//find a comment by id
	app.get("/api/project/comment/:id", function(req, res){
		var commentId = req.params.id;
		CommentModel.findCommentById(commentId).then(function(comment){
			res.json(comment);
		});
	});
	
	//find all comments by user
	app.get("/api/project/user/:userId/comment", function(req, res){
		var userId = req.params.userId;
		CommentModel.findCommentsByUserId(userId).then(function(comments){
			res.json(comments);
		});
	});
	
	//find all comments for a particular post
	app.get("/api/project/post/:postId/comment", function(req, res){
		var postId = req.params.postId;
		CommentModel.findCommentsByPostId(postId).then(function(comments){
			res.json(comments);
		});
	});
	
	//create a new comment
	app.post("/api/project/comment", function(req, res){
		var comment = req.body;
		CommentModel.createComment(comment).then(function(commentsSamePost){
			res.json(commentsSamePost);
		});
	});
	
	//delete a comment
	app.delete("/api/project/comment/:id", function(req, res){
		var commentId = req.params.id;
		CommentModel.deleteComment(commentId).then(function(commentsSamePost){
			res.json(commentsSamePost);
		});
	});
	
	//update a comment
	app.put("/api/project/comment/:id", function(req, res){
		var commentId = req.params.id;
		var comment = req.body;
		CommentModel.updateComment(commentId, comment).then(function(commentsSamePost){
			res.json(commentsSamePost);
		});
	});
	
}