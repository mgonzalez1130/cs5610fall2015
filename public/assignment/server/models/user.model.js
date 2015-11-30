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
		findUserByCredentials: findUserByCredentials
	};
	return api;
	
	function createUser(user) {
		var deferred = q.defer();
		UserModel.create(user, function(err, result){
			UserModel.find(function(err, users){
				deferred.resolve(users);
			});
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
		UserModel.find({ _id : userId}, function(err, result){
			deferred.resolve(result[0]);
		});
		return deferred.promise;
	}
	
	function updateUser(userId, user) {
		var deferred = q.defer();
		UserModel.update(
			{ _id : userId },
			{
				firstName: user.firstName,
				lastName: user.lastName,
				username: user.username,
				password: user.password,
				email: user.email 
			}, function(err, result){
				UserModel.find(function(err, results){
					deferred.resolve(results);
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
		UserModel.find({ username : username}, function(err, res){
			deferred.resolve(res[0]);
		});
		return deferred.promise;
	}
	
	function findUserByCredentials(credentials) {
		var deferred = q.defer();
		UserModel.find({ 
			username : credentials.username, 
			password : credentials.password},
			function(err, res){
				deferred.resolve(res[0]);
			});
		return deferred.promise;
	}
};