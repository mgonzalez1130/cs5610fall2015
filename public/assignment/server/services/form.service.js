
module.exports = function(app, formModel) {
	
	//returns an array of forms belonging to specified user
	app.get("/api/assignment/user/:userId/form", function(req, res) {
		var userId = req.params.userId;
		res.json(formModel.findUserForms(userId));
	});
	
	//returns the form object with the specified id
	app.get("/api/assignment/form/:formId", function(req, res) {
		var formId = req.params.formId;
		res.json(formModel.findFormById(formId));
	});
	
	//removes the form object with the specified id
	app.delete("/api/assignment/form/:formId", function(req, res) {
		var formId = req.params.formId;
		res.json(formModel.deleteForm(formId));
	});
	
	//creates a new form
	app.post("/api/assignment/user/:userId/form", function(req, res) {
		var userId = req.params.userId;
		var form = req.body;
		res.json(formModel.createForm(form, userId));
	});
	
	//updates the form object with the specified id
	app.put("/api/assignment/form/:formId", function(req, res) {
		var formId = req.params.formId;
		var form = req.body;
		res.json(formModel.updateForm(formId, form));
	});
	
	//gets all forms
	app.get("/api/assignment/form", function(req, res) {
		res.json(formModel.findAllForms());
	});
}