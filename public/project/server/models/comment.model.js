var q = require('q');

module.exports = function(db, mongoose) {
	var CommentSchema = require('./comment.schema.js')(mongoose);
	var CommentModel = mongoose.model("Comment", CommentSchema);
	
	var api = {
		findAllComments: findAllComments,
		findCommentById: findCommentById,
		findCommentsByUserId: findCommentsByUserId,
		findCommentsByPostId: findCommentsByPostId,
		createComment: createComment,
		deleteComment: deleteComment,
		updateComment: updateComment
	};
	return api;
	
	//Finds all comments
	function findAllComments() {
		var deferred = q.defer();
		CommentModel.find(function(err, res) {
			deferred.resolve(res);
		});
		return deferred.promise;
	}
	
	//Find a single comment by a given commentId
	function findCommentById(commentId) {
		var deferred = q.defer();
		CommentModel.findById(commentId, function(err, res){
			deferred.resolve(res);
		});
		return deferred.promise;
	}
	
	//Find all the comments associated with the given userId
	function findCommentsByUserId(userId) {
		var deferred = q.defer();
		CommentModel.find({ userId : userId}, function(err, res){
			deferred.resolve(res);
		});
		return deferred.promise;
	}
	
	//Find all the comments associated with the given postId
	function findCommentsByPostId(postId) {
		var deferred = q.defer();
		CommentModel.find({ postId : postId}, function(err, res){
			deferred.resolve(res);
		});
		return deferred.promise;
	}
	
	//Create a new comment and returns the new comment
	function createComment(comment) {
		var deferred = q.defer();
		CommentModel.create(comment, function(err, res){
			deferred.resolve(res);
		});
		return deferred.promise;
	}
	
	//Deletes the comment specified by the given commentId and
	//returns all of the comments associated with the same postId
	//as the comment that was removed
	function deleteComment(commentId) {
		var deferred = q.defer();
		CommentModel.findByIdAndRemove(commentId, function(err, res){
			var postId = res.postId;
			CommentModel.find({ postId : postId}, function(err, res){
				deferred.resolve(res);
			});
		});
		return deferred.promise;
	}
	
	//Updates the comment specified by commentId according to the given
	//comment object. Returns all of the comments assoicated the same postId
	//as the comment that was updated
	function updateComment(commentId, comment) {
		var deferred = q.defer();
		CommentModel.findByIdAndUpdate(commentId, comment, function(err, res){
			var postId = res.postId;
			CommentModel.find({ postId : postId}, function(err, res){
				deferred.resolve(res);
			});
		});
		return deferred.promise;
	}
};