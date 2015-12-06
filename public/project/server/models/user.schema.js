module.exports = function(mongoose) {
	var UserSchema = mongoose.Schema({
		"firstName": String, 
		"lastName": String,
		"username": String,
		"password": String,
		"email": String,
		"isModerator": {type: Boolean, default: false},
		"posts": [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
		"comments": [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
		"following": [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
		"followers": [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
		"postVotes": [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
		"commentVotes": [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
	}, {collection: "cs5610.project.user"});
	return UserSchema;
};