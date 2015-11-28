module.exports = function(mongoose) {
	var FieldSchema = mongoose.Schema({
		"label": String,
		"type": {
			type: String, 
			enum: ["TEXT", "TEXTAREA", "RADIOS", "CHECKBOXES", "OPTIONS", "DATE"]
			},
		"options": [String],
		"placeholder": String
	});
	return FieldSchema;
};