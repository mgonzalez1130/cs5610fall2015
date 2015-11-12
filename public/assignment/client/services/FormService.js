"use strict";

(function() {
	angular
		.module("FormBuilderApp")
		.factory("FormService", FormService);
	
	function FormService() {
		var forms = [];
		var service = {
			createFormByUser : createFormByUser,
			findAllFormsForUser : findAllFormsForUser,
			deleteFormById : deleteFormById,
			updateFormById : updateFormById
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
		
		function createFormByUser(userId, form, callback) {
			form.id = guid();
			form.userid = userId;
			forms.push(form);
			callback(form);
		}
		
		function findAllFormsForUser(userId, callback) {
			var usersForms = [];
			for (var i = 0; i < forms.length; i++) {
				var form = forms[i];
				if (form.userid == userId) {
					usersForms.push(form);
				}
			}
			callback(usersForms);
		}
		
		function deleteFormById(formId, callback) {
			for (var i = 0; i < forms.length; i++) {
				if (forms[i].id == formId) {
					forms.splice(i, 1);
					break;
				}
			}
			callback(forms);
		}
		
		function updateFormById(formId, newForm, callback) {
			for (var i = 0; i < forms.length; i++) {
				var currentForm = forms[i];
				if (currentForm.id == formId) {
					newForm.id = currentForm.id;
					newForm.userid = currentForm.userid;
					forms[i] = newForm;
					callback(currentForm);
					break;
				}
			}
		}
	}
})();