var q = require('q');

module.exports = function(db, mongoose) {
	var PostSchema = require('./post.schema.js')(mongoose);
	var PostModel = mongoose.model('Post', PostSchema);
	
	var api = {
		findAllPosts: findAllPosts,
		findPostById: findPostById,
		findPostsByUserId: findPostsByUserId,
		findPostsByTag: findPostsByTag,
		createPost: createPost,
		deletePost: deletePost,
		updatePost: updatePost,
		addComment: addComment,
		removeComment: removeComment
	};
	return api;
	
	//Finds and returns all posts
	function findAllPosts() {
		var deferred = q.defer();
		PostModel.find(function(err, res){
			deferred.resolve(res);
		});
		return deferred.promise;
	}
	
	//Returns the post with the given postId
	function findPostById(postId){
		var deferred = q.defer();
		PostModel.findById(postId, function(err, res){
			deferred.resolve(res);
		});
		return deferred.promise;		
	}
	
	//Returns all of the posts associated with the given
	//userId
	function findPostsByUserId(userId){
		var deferred = q.defer();
		PostModel.find({ userId : userId}, function(err, res){
			deferred.resolve(res);
		});
		return deferred.promise;		
	}
	
	//Returns all posts tagged with the given tag
	function findPostsByTag(tag){
		var deferred = q.defer();
		PostModel.find({ tags: tag }, function(err, res){
			deferred.resolve(res);
		});
		return deferred.promise;		
	}
	
	//Creates the given post and returns the new post
	function createPost(post){
		var deferred = q.defer();
		PostModel.create(post, function(err, res){
			deferred.resolve(res);
		});
		return deferred.promise;		
	}
	
	//Deletes the post specified by the given postid
	function deletePost(postId) {
		var deferred = q.defer();
		PostModel.findByIdAndRemove(postId, function(err, res){
			deferred.resolve(res);
		});
		return deferred.promise;		
	}
	
	//Uses the post object provided to update the post
	//with the given postid. Returns the new post 
	function updatePost(postId, post) {
		var deferred = q.defer();
		PostModel.findByIdAndUpdate(postId, post, function(err, res){
			PostModel.findById(postId, function(err, post){
				deferred.resolve(post);
			});
		});
		return deferred.promise;		
	}
	
	//Adds the given comment to the list of comments for this post
	function addComment(postId, comment) {
		var deferred = q.defer();
		PostModel.findById(postId, function(err, post){
			if (comment.isProof) {
				post.proof.push(comment._id);
			} else if (comment.isDisproof) {
				post.disproof.push(comment._id);	
			} else {
				post.opinions.push(comment._id);
			}
			post.save(function(err, res){
				deferred.resolve(res);
			});
		});
		return deferred.promise;
	};
	
	//Removes the given comment from all of the specified posts
	//comment lists
	function removeComment(postId, commentId) {
		var deferred = q.defer();
		PostModel.findById(postId, function(err, post){
			post.proof.pull(commentId);
			post.disproof.pull(commentId);
			post.opinions.pull(commentId);
			post.save(function(err, res){
				deferred.resolve(res);
			});
		});
		return deferred.promise;
	}
};