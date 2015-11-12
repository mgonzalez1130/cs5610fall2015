
module.exports = function(app, formModel) {
	
	//returns an array of fields belonging to the form with
	//the specified id
	app.get("/api/assignment/form/:formId/field", function(req, res) {
		var formId = req.params.formId;
		res.json(formModel.getFormFields(formId));
	});
	
	//returns the field object with the specified id and belonging to the
	//specified form
	app.get("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
		var formId = req.params.formId;
		var fieldId = req.params.fieldId;
		res.json(formModel.getField(formId, fieldId));
	});
	
	//removes the field object with the speicified id and belonging to the
	//specified form
	app.delete("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
		var formId = req.params.formId;
		var fieldId = req.params.fieldId;
		res.json(formModel.deleteField(formId, fieldId));
	});
	
	//creates a new field whose properties are the same as the field object
	//embedded in the request body
	app.post("/api/assignment/form/:formId/field", function(req, res) {
		var formId = req.params.formId;
		var field = req.body;
		res.json(formModel.createField(formId, field));
	});
	
	//updates the field object with the specified id
	app.put("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
		var formId = req.params.formId;
		var fieldId = req.params.fieldId;
		var field = req.body;
		res.json(formModel.updateField(formId, fieldId, field));
	});
}