"use strict";

(function() {
	angular
		.module("FormBuilderApp")
		.controller("FormController", FormController);
		
	function FormController($scope, $rootScope, FormService) {
		var currentUser = $rootScope.user;
		$scope.selectedFormIndex = -1;

		FormService.findAllFormsForUser(currentUser.id, FindAllFormsCallback)		
		function FindAllFormsCallback(forms) {
			$scope.forms = forms;
		}
		
		$scope.addForm = addForm;
		function addForm() {
			var newForm = {form_name : $scope.form_name};
			FormService.createFormByUser(currentUser.id, newForm, AddFormCallback)
		}
		function AddFormCallback(form) {
			$scope.forms.push(form);
			$scope.form_name = "";
		}
		
		$scope.updateForm = updateForm;
		function updateForm() {
			var newForm = {form_name : $scope.form_name};
			var selectedForm = $scope.forms[$scope.selectedFormIndex];
			FormService.updateFormById(selectedForm.id, newForm, UpdateFormCallback);
		}
		function UpdateFormCallback(form) {
			FormService.findAllFormsForUser(currentUser.id, FindAllFormsCallback);
			$scope.selectedFormIndex = -1;
			$scope.form_name = "";
		}
		
		$scope.deleteForm = deleteForm;
		function deleteForm(index) {
			FormService.deleteFormById($scope.forms[index].id, DeleteFormCallback);
		}
		function DeleteFormCallback(forms) {
			$scope.forms = forms;
		}
		
		$scope.selectForm = selectForm;
		function selectForm(index) {
			$scope.selectedFormIndex = index;
			$scope.form_name = $scope.forms[index].form_name;
		}
	}

})();