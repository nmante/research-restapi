/**
 * Nii Mante
 * Error Handling Code
 *
 * The following code will include error handling middleware.
 * The middleware will be used in the main express app (app.js)
 *
 */


module.exports = (function (){
	var expressWinston = require('express-winston');
	var winston = require('winston');
	
	var _errorCodes = {
		ParamError : 'ParamError',
		DeleteError : 'DeleteError'
	};
	
	var _errorLogger = expressWinston.errorLogger({
		transports : [
			new winston.transports.Console({
				json : true,
				colorize: true
			})
		]
	});

	var _clientErrorHandler = function (err, req, res, next) {
		// If the response code 
		if (res.statusCode >= 500 ){
			return next(err);
		}

		// Now we need to check for each type of client side error
		res.json({ error : err.name , message : err.message }); 


		// Possibly add some jade rendering
		// Make it vary based on the error code
		if (err.name === _errorCodes.PostError) {

		} else if (err.name === _errorCodes.GetError) {

		} else if (err.name === _errorCodes.DeleteError) {

		} else if (err.name === _errorCodes.UpdateError ) {

		}

	};

	var _errorHandler = function (err, req, res, next) {
		res.status(500);
		console.log(err);
		res.send({ error: 'Error found' });
	};

	

	return {
		errorLogger : _errorLogger,
		clientErrorHandler : _clientErrorHandler,
		errorHandler : _errorHandler,
		errorCodes : _errorCodes
	};
})();
