var forms = require('./form.mock.json');

module.exports = function() {
	var api = {
		createForm: createForm,
		findAllForms: findAllForms,
		findFormById: findFormById,
		updateForm: updateForm,
		deleteForm: deleteForm,
		findFormByTitle: findFormByTitle
	};
	return api;
	
	function createForm(form) {
		forms.push(form);
		return forms;
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
		return forms;
	}
	
	function deleteForm(formId) {
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].id == formId) {
				forms.splice(i, 1);
			}
		}
		return forms;
	}
	
	function findFormByTitle(title) {
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].title == title) {
				return forms[i];
			}
		}
		return null;
	}
};