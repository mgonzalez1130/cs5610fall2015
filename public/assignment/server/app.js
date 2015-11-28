
module.exports = function(app) {
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/cs5610');
	var db = mongoose.connection;

	//create models and pass them to the corresponding services
	var userModel = require('./models/user.model.js')(db, mongoose);
	require('./services/user.service.js')(app, userModel);
	
	var formModel = require('./models/form.model.js')(db, mongoose);
	require('./services/form.service.js')(app, formModel);
	require('./services/field.service.js')(app, formModel);
};