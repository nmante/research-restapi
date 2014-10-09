/**
 * Nii Mante
 *
 * Study Routing
 *
 */

//module.exports = function studyRouter (_app, _config, _utils, _model) {
module.exports = function patientRouter (options, _model) {

	var express = require('express');
	var router = express.Router();
	var utils = options._utils;
	var errorCodes = options._errorCodes;
	var regexEvaluator = utils.regexEvaluator;

	var Study = _model;

	router.param(regexEvaluator);

	// Create
	router.post('/', createStudy);

	// Read
	router.param('studyId', /^[a-z0-9]{24}$/);
	router.get('/', getStudies);
	router.get('/:studyId', getStudyById);

	// Update
	router.put('/:studyId', updateStudyById);

	// Delete
	router.delete('/:studyId', deleteStudyById);

	// Create
	function createStudy(req, res, next) {
		var study = req.body;
		Study.createStudy(study, function( err, _study) {
			var x = determineErrorType(err, res, next, null, 
					errorCodes.PostError, _study);
			if (x) return next(x);

			res.status(200).json(_study);

		});

	}

	// Read
	function getStudyById(req, res, next) {
		var id = req.params.studyId;
		if (id === undefined) {
			var err = new Error('Study Id not supplied for find');
			err.name = errorCodes.ParamError;
			return next(err);
		}

		Study.findStudyById(id, function (err, study) {
			var x = determineErrorType(err, res, next, id, 
					errorCodes.GetError, study);
			if (x) return next(x);

			res.status(200).json(study);
		});

	}

	// Read
	function getStudyByName(req, res, next) {

	}

	// Read 
	function getStudies (req, res, next) {
		Study.findAllStudies(function(err, studies) {
			var x = determineErrorType(err, res, next, null, 
					errorCodes.GetError, studies);
			if (x) return next(x);

			res.status(200).json(studies);
		});

	}

	// Update
	function updateStudyById(req, res, next) {
		var id = req.params.studyId;
		if (id === undefined) {
			var err = new Error('Study Id not supplied for update');
			err.name = errorCodes.ParamError;
			return next(err);
		}
		var updateObject = req.body;

		Study.updateStudyById(id, updateObject, function(err, study) {
			var x = determineErrorType(err, res, next, id, 
					errorCodes.PutError, study);
			if (x) return next (x);

			res.status(200).json(study);
		});

	}


	// Update 
	function updateStudyByName(req, res, next) {

	}

	// Delete
	function deleteStudyById(req, res, next) {
		var id = req.params.studyId;
		if (id === undefined) {
			var err = new Error('Study Id not supplied for delete');
			err.name = errorCodes.ParamError;
			return next(err);
		}
		Study.deleteStudyById(id, function(err, study){
			var x = determineErrorType(err, res, next, id, 
					errorCodes.DeleteError, study);
			if (x) return next(x);

			res.status(200).json(study);
		});
	}

	// Delete 
	function deleteStudyByName(req, res, next) {

	}	
	
	function determineErrorType(err, res, next, id, errCode, item) {
		var x;
		if (err) {
			res.status(500);
			x = err;
		} else if (!item) {
			res.status(404);
			var e = new Error('Study: ' + id + ' not found.');
			e.name = errCode;
			x = e;
		}

		return x;	
	}

	return router;

};
