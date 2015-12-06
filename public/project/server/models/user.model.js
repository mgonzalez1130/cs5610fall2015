var q = require('q');

module.exports = function(db, mongoose) {
	var UserSchema = require('./user.schema.js')(mongoose);
	var UserModel = mongoose.model('User', UserSchema);
	
	var api = {
		createUser: createUser,
		findAllUsers: findAllUsers,
		findUserById: findUserById,
		updateUser: updateUser,
		deleteUser: deleteUser,
		findUserByUsername: findUserByUsername,
		findUserByCredentials: findUserByCredentials,
		followUser: followUser,
		unfollowUser: unfollowUser,
		addPost: addPost,
		deletePost: deletePost,
		voteComment: voteComment,
		votePost: votePost
	};
	return api;
	
	function createUser(user) {
		var deferred = q.defer();
		
		UserModel.findOne({username : user.username}, function(err, existingUser){
			if (existingUser == null){
				UserModel.create(user, function(err, result){
					deferred.resolve(result);
				});	
			} else {
				deferred.resolve(null);
			}
		});
		return deferred.promise;
	}
	
	function findAllUsers() {
		var deferred = q.defer();
		UserModel.find(function(err, result){
			deferred.resolve(result);
		});
		return deferred.promise;
	}
	
	function findUserById(userId) {
		var deferred = q.defer();
		UserModel
			.findById(userId)
			.populate("posts followers following")
			.exec(function(err, user){
				deferred.resolve(user);
		});
		return deferred.promise;
	}
	
	function updateUser(userId, user) {
		var deferred = q.defer();
		UserModel.findByIdAndUpdate(userId, user, function(err, result){
			UserModel
				.findById(userId)
				.populate("posts followers following")
				.exec(function(err, user){
					deferred.resolve(user);
			});			
		});
		return deferred.promise;
	}
	
	function deleteUser(userId) {
		var deferred = q.defer();
		UserModel.remove({ _id : userId}, function(err, res){
			UserModel.find(function(err, results){
				deferred.resolve(results);
			});
		});
		return deferred.promise;
	}
	
	function findUserByUsername(username) {
		var deferred = q.defer();
		UserModel
			.find({ username : username})
			.populate("posts followers following")
			.exec(function(err, user){
				deferred.resolve(user);
		});		
		return deferred.promise;
	}
	
	function findUserByCredentials(credentials) {
		var deferred = q.defer();
		UserModel
		.findOne({ 
			username : credentials.username, 
			password : credentials.password})
		.populate("posts followers following")
		.exec(function(err, user){
			deferred.resolve(user);
		});
		return deferred.promise;
	}
	
	function followUser(followerId, followedId) {
		var deferred = q.defer();
		//Unfollow followedUser
		UserModel.findById(followerId, function(err, follower){
			follower.following.push(followedId);
			follower.save(function(err, follower){
				//Remove followerUser from followers
				UserModel.findById(followedId, function(err, followedUser){
					followedUser.followers.push(followerId);
					followedUser.save(function(err, response){
						//Return follower
						UserModel
							.findById(followerId)
							.populate("posts followers following")
							.exec(function(err, user){
								deferred.resolve(user);
						});
					});
				});
			});
		});
		return deferred.promise;
	}
	
	function unfollowUser(followerId, followedId) {
		var deferred = q.defer();
		//Unfollow followedUser
		UserModel.findById(followerId, function(err, follower){
			follower.following.pull(followedId);
			follower.save(function(err, follower){
				//Remove followerUser from followers
				UserModel.findById(followedId, function(err, followedUser){
					followedUser.followers.pull(followerId);
					followedUser.save(function(err, response){
						//Return follower
						UserModel
							.findById(followerId)
							.populate("posts followers following")
							.exec(function(err, user){
								deferred.resolve(user);
						});
					});
				});
			});
		});
		return deferred.promise;
	}
	
	function addPost(userId, postId) {
		var deferred = q.defer();
		UserModel.findById(userId, function(err, user){
			user.posts.push(postId);
			user.save(function(err, res){
				UserModel
					.findById(userId)
					.populate("posts followers following")
					.exec(function(err, user){
						deferred.resolve(user);
				});
			});
		});
		return deferred.promise;
	}

	function deletePost(userId, postId) {
		var deferred = q.defer();
		UserModel.findById(userId, function(err, user){
			user.posts.pull(postId);
			user.save(function(err, res){
				UserModel
					.findById(userId)
					.populate("posts followers following")
					.exec(function(err, user){
						deferred.resolve(user);
				});
			});
		});
		return deferred.promise;
	}
		
	function voteComment(userId, commentId) {
		var deferred = q.defer();
		UserModel.findById(userId, function(err, user){
			user.commentVotes.push(commentId);
			user.save(function(err, res){
				UserModel
					.findById(userId)
					.populate("posts followers following")
					.exec(function(err, user){
						deferred.resolve(user);
				});
			});
		});
		return deferred.promise;
	}
	
	function votePost(userId, postId) {
		var deferred = q.defer();
		UserModel.findById(userId, function(err, user){
			user.postVotes.push(postId);
			user.save(function(err, res){
				UserModel
					.findById(userId)
					.populate("posts followers following")
					.exec(function(err, user){
						deferred.resolve(user);
				});
			});
		});
		return deferred.promise;
	}
};