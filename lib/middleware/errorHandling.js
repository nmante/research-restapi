/**
 * Nii Mante
 * Error Handling Code
 *
 * The following code will include error handling middleware.
 * The middleware will be used in the main express app (app.js)
 *
 */


module.exports = function (){
	var expressWinston = require('express-winston');
	var winston = require('winston');
	
	

	/*var _errorLogger = function (err, req, res, next) {
		console.log(err.stack);
		next(err);
	};*/
	var _errorLogger = expressWinston.errorLogger({
		transports : [
			new winston.transports.Console({
				json : true,
				colorize: true
			})
		]
	});

	var _clientErrorHandler = function (err, req, res, next) {
		console.log('In client error handler');
		console.log(err.name + ': ' + err.message);
		// Check if the client used an AJAX call
		/*
		if (req.xhr) {
			res.status(500).json({ error: 'AJAX call failed' });
		} else {
			next(err);
		}
		*/
		next(err);
	};

	var _errorHandler = function (err, req, res, next) {
		console.log('In server error handler');
		console.log(err);	
		res.status(500);
		res.send({ error: 'Error found' });
	};

	return {
		errorLogger : _errorLogger,
		clientErrorHandler : _clientErrorHandler,
		errorHandler : _errorHandler
	};
}();
