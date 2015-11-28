
module.exports = function(app, formModel) {
	
	//returns an array of fields belonging to the form with
	//the specified id
	app.get("/api/assignment/form/:formId/field", function(req, res) {
		var formId = req.params.formId;
		formModel.getFormFields(formId).then(function(response){
			res.json(response);
		});
	});
	
	//returns the field object with the specified id and belonging to the
	//specified form
	app.get("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
		var formId = req.params.formId;
		var fieldId = req.params.fieldId;
		formModel.getField(formId, fieldId).then(function(response){
			res.json(response);
		});
	});
	
	//removes the field object with the speicified id and belonging to the
	//specified form
	app.delete("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
		var formId = req.params.formId;
		var fieldId = req.params.fieldId;
		formModel.deleteField(formId, fieldId).then(function(response){
			res.json(response);
		});
	});
	
	//creates a new field whose properties are the same as the field object
	//embedded in the request body
	app.post("/api/assignment/form/:formId/field", function(req, res) {
		var formId = req.params.formId;
		var field = req.body;
		formModel.createField(formId, field).then(function(response){
			res.json(response);
		});
	});
	
	//updates the field object with the specified id
	app.put("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
		var formId = req.params.formId;
		var fieldId = req.params.fieldId;
		var field = req.body;
		formModel.updateField(formId, fieldId, field).then(function(response){
			res.json(response);
		});
	});
}