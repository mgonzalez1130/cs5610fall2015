var users = require('./user.mock.json');

module.exports = function(uuid) {
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
		user.id = uuid.v1();
		users.push(user);
		return users;
	}
	
	function findAllUsers() {
		return users;
	}
	
	function findUserById(userId) {
		for (var i = 0; i < users.length; i++) {
			if (users[i].id == userId) {
				return users[i];
			}
		}
		return null;
	}
	
	function updateUser(userId, user) {
		for (var i = 0; i < users.length; i++) {
			if (users[i].id == userId) {
				users[i].firstName = user.firstName;
				users[i].lastName = user.lastName;
				users[i].username = user.username;
				users[i].password = user.password;
				users[i].email = user.email;
				break;
			}
		}
		return users;
	}
	
	function deleteUser(userId) {
		for (var i = 0; i < users.length; i++) {
			if (users[i].id == userId) {
				users.splice(i, 1);
			}
		}
		return users;
	}
	
	function findUserByUsername(username) {
		for (var i = 0; i < users.length; i++) {
			if (users[i].username == username) {
				return users[i];
			}
		}
		return null;
	}
	
	function findUserByCredentials(credentials) {
		for (var i = 0; i < users.length; i++) {
			if (users[i].username == credentials.username && 
				users[i].password == credentials.password) {
				return users[i];
			}
		}
		return null;
	}
};