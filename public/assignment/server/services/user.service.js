
module.exports = function(app, userModel) {
	
	//create new user
	app.post("/api/assignment/user", function(req, res) {
		var user = req.body;
		userModel.createUser(user).then(function(response){
			res.json(response);
		});
	});
		
	//return a specific user by credentials or by username if they are provided
	//otherwise return all users
	app.get("/api/assignment/user", function(req, res) {
		if (req.query.username && req.query.password) {
			var credentials = {"username":req.query.username, "password":req.query.password};
			userModel.findUserByCredentials(credentials).then(function(response){
				res.json(response);
			});
		} else if (req.query.username) {
			userModel.findUserByUsername(req.query.username).then(function(response){
				res.json(response);
			});
		} else {
			userModel.findAllUsers().then(function(response){
				res.json(response);
			});
		}
	});
	
	//find user by id
	app.get("/api/assignment/user/:id", function(req, res) {
		var id = req.params.id;
		userModel.findUserById(id).then(function(response){
			res.json(response);
		});
	});
	
	//update user by id
	app.put("/api/assignment/user/:id", function(req, res) {
		var id = req.params.id;
		var user = req.body;
		userModel.updateUser(id, user).then(function(response){
			res.json(response);
		});
	});
	
	//delete user by id
	app.delete("/api/assignment/user/:id", function(req, res) {
		var id = req.params.id;
		userModel.deleteUser(id).then(function(response){
			res.json(response);
		});
	});
}