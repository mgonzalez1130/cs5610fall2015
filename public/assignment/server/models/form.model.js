var q = require('q');

module.exports = function(db, mongoose) {
	var FieldSchema = require('./field.schema.js')(mongoose);
	var FieldModel = mongoose.model('Field', FieldSchema);
    var FormSchema = require('./form.schema.js')(mongoose);
	var FormModel = mongoose.model('Form', FormSchema);
	
	var api = {
		createForm: createForm,
		findAllForms: findAllForms,
		findFormById: findFormById,
		updateForm: updateForm,
		deleteForm: deleteForm,
		findFormByTitle: findFormByTitle,
		findUserForms: findUserForms,
		getFormFields: getFormFields,
		getField: getField,
		deleteField: deleteField,
		createField: createField,
		updateField: updateField
	};
	return api;
	
	function createForm(form, userId) {
		var deferred = q.defer();
		form.userId = userId;
		FormModel.create(form, function(err, res){
			FormModel.find(function(err, forms){
				deferred.resolve(forms);
			})
		})
		return deferred.promise;
	}
	
	function findAllForms() {
		var deferred = q.defer();
		FormModel.find(function(err, res){
			deferred.resolve(res);
		});
		return deferred.promise;
	}
	
	function findFormById(formId) {
		var deferred = q.defer();
		FormModel.find({ _id : formId}, function(err, res){
			deferred.resolve(res[0]);
		});
		return deferred.promise;
	}
	
	function updateForm(formId, form) {		
		var deferred = q.defer();
		FormModel.update(
			{ _id : formId },
			{
				title: form.title,
				userId: form.userId,
				fields: form.fields
			}, function(err, res){
				FormModel.find(function(err, forms){
					deferred.resolve(forms);
				});
			});
		return deferred.promise;
	}
	
	function deleteForm(formId) {
		var deferred = q.defer();
		FormModel.remove({ _id : formId}, function(err, res){
			FormModel.find(function(err, forms){
				deferred.resolve(forms);
			});
		});
		return deferred.promise;
	}
	
	function findFormByTitle(title) {
		var deferred = q.defer();
		FormModel.find({ title : title}, function(err, res){
			deferred.resolve(res[0]);
		});
		return deferred.promise;
	}
	
	function findUserForms(userId) {
		var deferred = q.defer();
		FormModel.find({ userId : userId}, function(err, res){
			deferred.resolve(res);
		});
		return deferred.promise;
	}
	
	function getFormFields(formId) {
		var deferred = q.defer();
		FormModel.find({ _id : formId }, function(err, res){
			deferred.resolve(res[0].fields);
		});
		return deferred.promise;
	}
	
	function getField(formId, fieldId) {	
		var deferred = q.defer();
		FormModel.findById(formId, function(err, form){
			deferred.resolve(form.fields.id(fieldId));
		});
		return deferred.promise;
	}
	
	function deleteField(formId, fieldId) {
		var deferred = q.defer();
		FormModel.findById(formId, function(err, form){
			form.fields.id(fieldId).remove();
			form.save(function(err, form){
				deferred.resolve(form);
			});
		});
		return deferred.promise;
	}
	
	function createField(formId, field) {
		var deferred = q.defer();
		var newField = new FieldModel();
		newField.label = field.label;
		newField.type = field.type;
		newField.placeholder = field.placeholder;
		newField.options = field.options;
		FormModel.findById(formId, function(err, form){
			form.fields.push(newField);
			form.save(function(err, form){
				deferred.resolve(form);
			});
		});
		return deferred.promise;
	}
	
	function updateField(formId, fieldId, field) {
		var deferred = q.defer();
		FormModel.findById(formId, function(err, form){
			var oldField = form.fields.id(fieldId);
			oldField.label = field.label;
			oldField.type = field.type;
			oldField.placeholder = field.placeholder;
			oldField.options = field.options;
			form.save(function(err, form){
				deferred.resolve(form);
			});
		});
		return deferred.promise;
	}
};