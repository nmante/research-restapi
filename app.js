/**
 * Nii Mante
 * Research Rest Api
 *
 * This file will serve as the front facing RESTful api for 
 * my research data.
 */

/* Includes */


// Include the Express modules
// These will allow us to work with HTTP methods (GET, POST, etc.)
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Database manipulation
var mongoose = require('mongoose');

// Create the express module
var app = express();

// Configuration file with app keys and database info 
var config = require('./config/config.json')[app.get('env')];

// Personal Utilities
var utils = require('./lib/middleware/utils');

// Personal Error Handling Modules
var errorHandling = require('./lib/middleware/errorHandling.js')

mongoose.connect(config.database);

// Include our own custom javascript modules for Routing
// The modules encapsulate http method behavior for each route
var options = {
	_app : app,
	_config : config,
	_utils : utils,
	_mongoose : mongoose	
};

var models = require('./models/models.js')(options);
var controllersPath = './controllers';
var controllers = require('./controllers/controllers')(options, controllersPath, models);
//var patient = require('./controllers/patients.js')(app, config, utils, models.patients);


/* Configuration */
// Use the 'bodyParser' to make parsing of the 'res' (response) body easy
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(cookieParser());

// Tell express to use the 'public' directory for client side files
app.use(express.static(path.join(__dirname, 'public')));

// Make the database accessible to our router
app.use(function(req, res, next) {
//	req.db = db; //define db, with mongoose or something
	next();
});


app.locals.baseApiUrl = base = '/api/v1';
// Tell Node+Express to use the modules for the routes
console.log('controllers');
console.log(controllers);
for (var url_key in controllers) {//.length - 1; i >= 0; i--) {
	// Format of each element is a filename 'controllerName.js'
	// We only want the 'controllerName' part
	var router  = controllers[url_key];	
	console.log('router object');
	console.log(router);

	// If it's index.js, thats our default route. Should be an empty string
	var url = url_key == 'index' ? '' : url_key;
	console.log('url');
	console.log(url);	
	app.use(base + '/' + url, router); 
}



var rt = express.Router();
//console.log('rt');
//console.log(rt);
rt.get('/dummy', function(req, res) {
	res.send('welcome to the dummy');
});

app.use('/rando', rt);
/* Error Handling */

// Return errors to the client via 404 and/or error pages
app.use(errorHandling.clientErrorHandler);

// Log errors for the server side
app.use(errorHandling.errorLogger);

// Handle the errors on the server side
app.use(errorHandling.errorHandler);

var debug = require('debug')('nii-research-backend');

app.set('port', process.env.PORT || 3000);
//var server = 
app.listen(app.get('port'));
/*app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + app.port);
});
*/

//module.exports = app;
