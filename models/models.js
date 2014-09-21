/**
 * Nii Mante
 *
 * This file will encapsulate all of the object models/schemas 
 * for the database.  These Models will be ORMs for MongoDB.
 *
 * I've chosen to create a module ('Models') which returns the 
 * other files in this directory.  This module will act as an 
 * interface to all other directories in the Node project 
 *
 */

var Models = function(options){

	var _ExperimentModel = require('./ExperimentSchema.js');
	var _StudyModel = require('./StudySchema.js');
	var _PatientModel = require('./PatientSchema.js'); 

	return {
		experiments : _ExperimentModel,
		studies : _StudyModel,
		patients : _PatientModel
	};

}();


module.exports = Models;
