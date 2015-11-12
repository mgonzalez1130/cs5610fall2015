var forms = require('./form.mock.json');
var uuid = require('node-uuid');

module.exports = function() {
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
		form.userId = userId;
		form.id = uuid.v1();
		forms.push(form);
	}
	
	function findAllForms() {
		return forms;
	}
	
	function findFormById(formId) {
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].id == formId) {
				return forms[i];
			}
		}
		return null;
	}
	
	function updateForm(formId, form) {
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].id == formId) {
				forms[i].title = form.title;
				forms[i].userId = form.userId;
				forms[i].fields = form.fields;
				break;
			}
		}
	}
	
	function deleteForm(formId) {
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].id == formId) {
				forms.splice(i, 1);
				break;
			}
		}
	}
	
	function findFormByTitle(title) {
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].title == title) {
				return forms[i];
			}
		}
		return null;
	}
	
	function findUserForms(userId) {
		var userForms = [];
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].userId == userId) {
				userForms.push(forms[i]);
			}
		}
		return userForms;
	}
	
	function getFormFields(formId) {
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].id == formId) {
				return forms[i].fields;
			}
		}
		return [];
	}
	
	function getField(formId, fieldId) {
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].id == formId) {
				var fields = forms[i].fields;
				for (var j = 0; j < fields.length; j++) {
					if (fields[j].id == fieldId) {
						return fields[j];
					}
				}
			}
		}
		return null;
	}
	
	function deleteField(formId, fieldId) {
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].id == formId) {
				var fields = forms[i].fields;
				for (var j = 0; j < fields.length; j++) {
					if (fields[j].id == fieldId) {
						forms[i].fields.splice(j, 1);
						break;
					}
				}
			}
		}
	}
	
	function createField(formId, field) {
		field.id = uuid.v1();
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].id == formId) {
				forms[i].fields.push(field);
				break;
			}
		}
	}
	
	function updateField(formId, fieldId, field) {
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].id == formId) {
				var fields = forms[i].fields;
				for (var j = 0; j < fields.length; j++) {
					if (fields[j].id == fieldId) {
						forms[i].fields[j] = field;
						break; 
					}
				}
			}
		}
	}
};