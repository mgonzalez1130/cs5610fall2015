"use strict";

(function() {
	angular
		.module("FormBuilderApp")
		.controller("FormController", FormController);
		
	function FormController($scope, $rootScope, FormService) {
		var currentUser = $rootScope.user;
		$scope.currentUser = currentUser;
		$scope.selectedFormIndex = -1;
		
		//Functions that are available to the UI
		$scope.addForm = addForm;
		$scope.updateForm = updateForm;
		$scope.deleteForm = deleteForm;
		$scope.selectForm = selectForm;

		//Find and set all the forms for the current user
		setUserForms();
		
		function setUserForms(){
			FormService.findAllFormsForUser(currentUser.id).then(function(response){
				$scope.forms = response;
			});
		}
		
		function addForm() {
			var newForm = {title : $scope.title};
			FormService.createFormByUser(currentUser.id, newForm).then(function(response){
				setUserForms();
				resetSelectedForm();
			});
		}

		function updateForm() {
			var selectedForm = $scope.forms[$scope.selectedFormIndex];
			selectedForm.title = $scope.title;
			FormService.updateFormById(selectedForm.id, selectedForm).then(function(response){
				setUserForms();
				resetSelectedForm();
			});
		}
		
		function deleteForm(index) {
			FormService.deleteFormById($scope.forms[index].id).then(function(response){
				setUserForms();
			});
		}
		
		function selectForm(index) {
			$scope.selectedFormIndex = index;
			$scope.title = $scope.forms[index].title;
		}
		
		function resetSelectedForm(){
			$scope.selectedFormIndex = -1;
			$scope.title = "";
		}
		
	}

})();