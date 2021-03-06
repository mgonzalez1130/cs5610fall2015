var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

/*
* Require statements for assignments
*/
//require('./public/assignment/server/app.js')(app);

/*
* Require statements for final project
*/
require('./public/project/server/app.js')(app);

app.listen(port, ipaddress);