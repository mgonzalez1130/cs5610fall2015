
module.exports = function(app, userModel) {
	
	//create new user
	app.post("/api/assignment/user", function(req, res) {
		var user = req.body;
		res.json(userModel.createUser(user));
	});
	
	//return a specific user by credentials or by username if they are provided
	//otherwise return all users
	app.get("/api/assignment/user", function(req, res) {
		if (req.query.username && req.query.password) {
			var credentials = {"username":req.query.username, "password":req.query.password};
			res.json(userModel.findUserByCredentials(credentials));
		} else if (req.query.username) {
			res.json(userModel.findUserByUsername(req.query.username));
		} else {
			res.json(userModel.findAllUsers());
		}
	});
	
	//find user by id
	app.get("/api/assignment/user/:id", function(req, res) {
		var id = req.params.id;
		res.json(userModel.findUserById(id));
	});
	
	//update user by id
	app.put("/api/assignment/user/:id", function(req, res) {
		var id = req.params.id;
		var user = req.body;
		res.json(userModel.updateUser(id, user));
	});
	
	//delete user by id
	app.delete("/api/assignment/user/:id", function(req, res) {
		var id = req.params.id;
		res.json(userModel.deleteUser(id));		
	});
}