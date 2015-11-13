"use strict";

(function() {
	angular
		.module("FormBuilderApp")
		.controller("FieldController", FieldController);
		
	function FieldController($scope, $routeParams, FieldService) {
		var userId = $routeParams.userId;
		var formId = $routeParams.formId;
		
		$scope.addField = addField;
		$scope.deleteField = deleteField;
		
		setFields();
		
		function setFields() {
			FieldService.getFieldsForForm(formId).then(function(response) {
				$scope.fields = response;
			});
		}
		
		function addField(fieldType) {
			if (fieldType == 'TEXT') {
				var newField = {"id": null, "label": "New Text Field", type: "TEXT", "placeholder": "new Field"};
			} else if (fieldType == 'TEXTAREA'){
				var newField = {"id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
			} else if (fieldType == 'DATE'){
				var newField = {"id": null, "label": "New Date Field", "type": "DATE"};
			} else if (fieldType == 'OPTIONS'){
				var newField = {"id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
								{"label": "Option 1", "value": "OPTION_1"},
								{"label": "Option 2", "value": "OPTION_2"},
								{"label": "Option 3", "value": "OPTION_3"}
							]};
			} else if (fieldType == 'CHECKBOXES'){
				var newField = {"id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
								{"label": "Option A", "value": "OPTION_A"},
								{"label": "Option B", "value": "OPTION_B"},
								{"label": "Option C", "value": "OPTION_C"}
							]};
			} else if (fieldType == 'RADIOS'){
				var newField = {"id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
								{"label": "Option X", "value": "OPTION_X"},
								{"label": "Option Y", "value": "OPTION_Y"},
								{"label": "Option Z", "value": "OPTION_Z"}
							]};
			}
			FieldService.createFieldForForm(formId, newField).then(function(response) {
				setFields();
			});
		}
		
		function deleteField(fieldIndex) {
			var fieldId = $scope.fields[fieldIndex].id;
			console.log("Trying to delete field " + fieldId + " at index " + fieldIndex);
			FieldService.deleteFieldFromForm(formId, fieldId).then(function(response) {
				setFields();
			});
		}
	}
})();