var Controllers = function (options, controllersPath, models) {
	
	// Use to find the names of the files in the controller directory
	var grabber = options._utils.grabber;

	var fileNames = grabber(controllersPath,'.js');

	// Use this to only grab the files that matter.  Any value
	// in this array is a route/controller to place in the ctrls array
	var routeNames = ['index', 'experiments', 'studies', 'patients'];

	var ctrls = {};	

	/*
	 * We'll create an object with the properties being controller type
	 * and the value being a require statement for the JS file
	 *
	 * e.g.
	 *	"experiment" : require('./experiment')(_app, _config, _utils)
	 */	
	
	function isInArray(value, array) {
		return array.indexOf(value) > -1;
	}

	// Look for a file in the directory
	// Add that filename to the controller object
	for (var i = fileNames.length - 1; i >= 0; i--) {
		var f = fileNames[i];
		f = f.split('.')[0];
		//if (isInArray(f, routeNames) ) {
		if ( f !== 'controllers') {
			var controllerName = require('./' + f);
			ctrls[f] = controllerName(options, models[f]);
		}
	}	

	//ctrls['index'] = require('./index.js')(options, models);
	
	// Return the controller object so that other modules can use it
	// The structure is like so
	// {
	// 	<routeName> : require(<routeName>)(options, model)
	// }
	return ctrls;

};

module.exports = Controllers;

