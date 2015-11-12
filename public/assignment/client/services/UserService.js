"use strict";

(function() {
	angular
		.module("FormBuilderApp")
		.factory("UserService", UserService);
		
	function UserService() {
		var users = [];
		var service = {
			findUserByUsernameAndPassword : findUserByUsernameAndPassword,
			findAllUsers : findAllUsers,
			createUser : createUser,
			deleteUserById : deleteUserById,
			updateUser : updateUser
		};
		return service;
		
		function guid() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
				s4() + '-' + s4() + s4() + s4();
		}
		
		function findUserByUsernameAndPassword(username, password, callback) {
			var foundUser = false;
			for (var i = 0; i < users.length; i++) {
				var currentUser = users[i];
				if (currentUser.username == username && currentUser.password == password) {
					foundUser = true;
					callback(currentUser);
					break;
				}
			}
			if (!foundUser) {
				callback(null);
			}
		}
		
		function findAllUsers(callback) {
			callback(users);
		}
		
		function createUser(user, callback) {
			user.id = guid();
			users.push(user);
			callback(user);
		}
		
		function deleteUserById(id, callback){
			for (var i = 0; i < users.length; i++) {
				if(users[i].id == id) {
					users.splice(i, 1);
					break;
				}
			}
			callback(users);
		}
		
		function updateUser(id, user, callback) {
			for (var currentUser in users) {
				if (currentUser.id == id) {
					user.id = currentUser.id;
					currentUser = user;
					callback(currentUser);
					break;
				}
			}
		}
		
	}
})();