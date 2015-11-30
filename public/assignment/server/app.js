
module.exports = function(app) {
	var mongoose = require('mongoose');

	var connectionString = 'mongodb://127.0.0.1:27017/cs5610';

	if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
	    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
	        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
	        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
	        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
	        process.env.OPENSHIFT_APP_NAME;
	}

	mongoose.connect(connectionString);
	var db = mongoose.connection;

	//create models and pass them to the corresponding services
	var userModel = require('./models/user.model.js')(db, mongoose);
	require('./services/user.service.js')(app, userModel);
	
	var formModel = require('./models/form.model.js')(db, mongoose);
	require('./services/form.service.js')(app, formModel);
	require('./services/field.service.js')(app, formModel);
};