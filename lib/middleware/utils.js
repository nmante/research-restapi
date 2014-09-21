/**
 * Nii Mante
 *
 * utils.js
 *
 * I'll add useful utilities here.  They'll be accessible as object properties.
 */  

module.exports = function (){
	
	/**
	 * This function looks in a directory and grabs all the 
	 * filenames of a specific extension.
	 *
	 * Use case:  I want the filenames of all the css files in the 
	 *	public directory
	 */
	
	// Private
	var _grabber = function (_path, _extension){
		// Grab the filesystem and path node module
		var fs = require('fs')
		, path = require('path');	
		
		// We'll place all the filenames in this array
		var filenameArray = [];

		// Grab all the files and directories in the provided directory
		// We can do this synchronously because were working locally
		var filesAndDirs = fs.readdirSync(_path);
		for (var i = filesAndDirs.length - 1; i >= 0; i--) {

			// If its not a directory AND its the right 
			// filetype. Do this synchronously
			// then add it to the array
			var fileName = filesAndDirs[i];
			var isDirectory = fs.statSync(_path + '/' + fileName).isDirectory();
			var extension = path.extname(fileName); 	

			if (!isDirectory && extension == _extension) {
				filenameArray.push(fileName);
			}
		}

		return filenameArray;

	};


	// Everything returned is 'public', and be accessed via property name 
	return {
		grabber : _grabber
	};

}();
