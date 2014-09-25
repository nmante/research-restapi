/**
 * Nii Mante
 * Error Handling Code
 *
 * The following code will include error handling middleware.
 * The middleware will be used in the main express app (app.js)
 *
 */


module.exports = function (){
	//var logger = require('morgan');
	
	

	var _errorLogger = function (err, req, res, next) {
		console.log(err.stack);
		next(err);
	};

	var _clientErrorHandler = function (err, req, res, next) {
		// Check if the client used an AJAX call
		if (req.xhr) {
			res.send(500, { error: 'AJAX call failed' });
		} else {
			next(err);
		}
	};

	var _errorHandler = function (err, req, res, next) {
		res.status(500);
		res.send({ error: 'Error found' });
	};

	return {
		errorLogger : _errorLogger,
		clientErrorHandler : _clientErrorHandler,
		errorHandler : _errorHandler
	};
}();
