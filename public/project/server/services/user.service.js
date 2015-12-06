module.exports = function(app, userModel) {
	
	//create new user
	app.post("/api/project/user", function(req, res) {
		var user = req.body;
		userModel.createUser(user).then(function(response){
			res.json(response);
		});
	});
		
	//return a specific user by credentials or by username if they are provided
	//otherwise return all users
	app.get("/api/project/user", function(req, res) {
		if (req.query.username && req.query.password) {
			var credentials = {"username":req.query.username, "password":req.query.password};
			userModel.findUserByCredentials(credentials).then(function(response){
				res.json(response);
			});
		} else if (req.query.username) {
			userModel.findUserByUsername(req.query.username).then(function(response){
				res.json(response);
			});
		} else {
			userModel.findAllUsers().then(function(response){
				res.json(response);
			});
		}
	});
	
	//find user by id
	app.get("/api/project/user/:id", function(req, res) {
		var id = req.params.id;
		userModel.findUserById(id).then(function(response){
			res.json(response);
		});
	});
	
	//update user by id
	app.put("/api/project/user/:id", function(req, res) {
		var id = req.params.id;
		var user = req.body;
		userModel.updateUser(id, user).then(function(response){
			res.json(response);
		});
	});
	
	//delete user by id
	app.delete("/api/project/user/:id", function(req, res) {
		var id = req.params.id;
		userModel.deleteUser(id).then(function(response){
			res.json(response);
		});
	});
	
	//follow user
	app.put("/api/project/user/:followerId/follow/:followedId", function(req, res){
		var followerId = req.params.followerId;
		var followedId = req.params.followedId;
		userModel.followUser(followerId, followedId).then(function(response){
			res.json(response);
		});
	});
	
	//unfollow user
	app.put("/api/project/user/:followerId/unfollow/:followedId", function(req, res){
		var followerId = req.params.followerId;
		var followedId = req.params.followedId;
		userModel.unfollowUser(followerId, followedId).then(function(response){
			res.json(response);
		});
	});
	
	//add post
	app.put("/api/project/user/:userId/post/:postId/add", function(req, res){
		var userId = req.params.userId;
		var postId = req.params.postId;
		userModel.addPost(userId, postId).then(function(response){
			res.json(response);
		});
	});
	
	//delete post
	app.put("/api/project/user/:userId/post/:postId/delete", function(req, res){
		var userId = req.params.userId;
		var postId = req.params.postId;
		userModel.deletePost(userId, postId).then(function(response){
			res.json(response);
		});
	});
	
	//delete comment
	app.put("/api/project/user/:userId/comment/:commentId/delete", function(req, res){
		var userId = req.params.userId;
		var commentId = req.params.userId;
		userModel.deleteComment(userId, commentId).then(function(response){
			res.json(response);
		});
	});
	
	//add comment
	app.put("/api/project/user/:userId/comment/:commentId/add", function(req, res){
		var userId = req.params.userId;
		var commentId = req.params.userId;
		userModel.addComment(userId, commentId).then(function(response){
			res.json(response);
		});
	});
	
	//vote on comment
	app.put("/api/project/user/:userId/comment/:commentId/vote", function(req, res){
		var userId = req.params.userId;
		var commentId = req.params.commentId;
		userModel.voteComment(userId, commentId).then(function(response){
			res.json(response);
		});
	});
	
	//vote on post
	app.put("/api/project/user/:userId/post/:postId/vote", function(req, res){
		var userId = req.params.userId;
		var postId = req.params.postId;
		userModel.votePost(userId, postId).then(function(response){
			res.json(response);
		});
	});
}