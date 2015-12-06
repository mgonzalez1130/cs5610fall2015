module.exports = function(mongoose) {
	var CommentSchema = mongoose.Schema({
		"postId": {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
		"userId": {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		"text": String,
		"username": String,
		"isOpinion": {type: Boolean, default: false},
		"isProof": {type: Boolean, default: false},
		"isDisproof": {type: Boolean, default: false},
		"reports": [String],
		"updated": {type: Date, default: Date.now()},
		"helpful": {type: Number, default: 0},
		"misleading": {type: Number, default: 0},
		"accurate": {type: Number, default: 0},
		"inaccurate": {type: Number, default: 0}
	}, {collection: "cs5610.project.comment"});
	return CommentSchema;
};