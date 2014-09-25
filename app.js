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
var debug = require('debug')('nii-research-backend');


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

var dbOptions = {
	server : {
		socketOptions : { keepAlive : 1 }
	}

};
//dbOptions.server.socketOptions = { keepAlive : 1 };

try {
	mongoose.connect(config.database, dbOptions);
} catch (e) {
	console.log(e.name + ': ' + e.message);
}

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

/* Configuration */
// Use the 'bodyParser' to make parsing of the 'res' (response) body easy
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(cookieParser());

// Tell express to use the 'public' directory for client side files
app.use(express.static(path.join(__dirname, 'public')));


app.locals.baseApiUrl = base = '/api/v1';
// Tell Node+Express to use the modules for the routes
for (var url_key in controllers) {//.length - 1; i >= 0; i--) {
	// Format of each element is a filename 'controllerName.js'
	// We only want the 'controllerName' part
	var router  = controllers[url_key];	

	// If it's index.js, thats our default route. Should be an empty string
	var url = url_key == 'index' ? '' : url_key;
	app.use(base + '/' + url, router); 
}

/* Error Handling */

// Return errors to the client via 404 and/or error pages
app.use(errorHandling.clientErrorHandler);

// Log errors only for the server side. That's why we place it after the client side error
// handler
app.use(errorHandling.errorLogger);

// Now handle the errors on the server side
app.use(errorHandling.errorHandler);


app.set('port', process.env.PORT || 3000);

//app.listen(app.get('port'));
app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + app.port);
});


//module.exports = app;
