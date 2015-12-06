module.exports = function(mongoose) {
	var PostSchema = mongoose.Schema({
		"userId": {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		"username": String,
		"title": String,
		"url": String,
		"description": String,
		"opinions": [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
		"proof": [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
		"disproof": [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
		"tags": [String],
		"reports": [String],
		"updated": {type: Date, default: Date.now()},
		"helpful": {type: Number, default: 0},
		"misleading": {type: Number, default: 0},
		"accurate": {type: Number, default: 0},
		"inaccurate": {type: Number, default: 0}
	}, {collection: "cs5610.project.post"});
	return PostSchema;
};