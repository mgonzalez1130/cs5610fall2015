"use strict";

(function() {
	angular
		.module("FormBuilderApp")
		.controller("FormController", FormController);
		
	function FormController($rootScope, FormService) {
		var model = this;
		
		var currentUser = $rootScope.user;
		model.currentUser = currentUser;
		model.selectedFormIndex = -1;
		
		//Functions that are available to the UI
		model.addForm = addForm;
		model.updateForm = updateForm;
		model.deleteForm = deleteForm;
		model.selectForm = selectForm;

		//Find and set all the forms for the current user
		setUserForms();
		
		function setUserForms(){
			FormService.findAllFormsForUser(currentUser._id).then(function(response){
				model.forms = response;
			});
		}
		
		function addForm() {
			var newForm = {title : model.title, fields: []};
			FormService.createFormByUser(currentUser._id, newForm).then(function(response){
				setUserForms();
				resetSelectedForm();
			});
		}

		function updateForm() {
			var selectedForm = model.forms[model.selectedFormIndex];
			selectedForm.title = model.title;
			FormService.updateFormById(selectedForm._id, selectedForm).then(function(response){
				setUserForms();
				resetSelectedForm();
			});
		}
		
		function deleteForm(index) {
			FormService.deleteFormById(model.forms[index]._id).then(function(response){
				setUserForms();
			});
		}
		
		function selectForm(index) {
			model.selectedFormIndex = index;
			model.title = model.forms[index].title;
		}
		
		function resetSelectedForm(){
			model.selectedFormIndex = -1;
			model.title = "";
		}
		
	}

})();