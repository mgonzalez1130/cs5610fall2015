"use strict";

(function() {
	angular
		.module("FormBuilderApp")
		.controller("FieldController", FieldController);
		
	function FieldController($scope, $routeParams, FieldService) {
		var model = this;
		
		var userId = $routeParams.userId;
		var formId = $routeParams.formId;
		
		model.addField = addField;
		model.deleteField = deleteField;
		
		setFields();
		
		function setFields() {
			FieldService.getFieldsForForm(formId).then(function(response) {
				model.fields = response;
			});
		}
		
		function addField(fieldType) {
			var newField;
			if (fieldType == 'TEXT') {
				newField = {"id": null, "label": "New Text Field", type: "TEXT", "placeholder": "new Field"};
			} else if (fieldType == 'TEXTAREA'){
				newField = {"id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
			} else if (fieldType == 'DATE'){
				newField = {"id": null, "label": "New Date Field", "type": "DATE"};
			} else if (fieldType == 'OPTIONS'){
				newField = {"id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
								{"label": "Option 1", "value": "OPTION_1"},
								{"label": "Option 2", "value": "OPTION_2"},
								{"label": "Option 3", "value": "OPTION_3"}
							]};
			} else if (fieldType == 'CHECKBOXES'){
				newField = {"id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
								{"label": "Option A", "value": "OPTION_A"},
								{"label": "Option B", "value": "OPTION_B"},
								{"label": "Option C", "value": "OPTION_C"}
							]};
			} else if (fieldType == 'RADIOS'){
				newField = {"id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
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
			var fieldId = model.fields[fieldIndex]._id;
			console.log("Trying to delete field " + fieldId + " at index " + fieldIndex);
			FieldService.deleteFieldFromForm(formId, fieldId).then(function(response) {
				setFields();
			});
		}
	}
})();