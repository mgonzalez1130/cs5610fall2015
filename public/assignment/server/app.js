
module.exports = function(app) {
	//create models and pass them to the corresponding services
	var userModel = require('./models/user.model.js');
	require('./services/user.service.js')(app, userModel);
};