/**
 * Nii Mante
 *
 * Experiment Routing
 *
 */

//module.exports = function(_app, _config, _utils, _model){
module.exports = function experimentRouter (options, _model) {

	var express = require('express');
	var router = express.Router();
	var utils = options._utils;
	var regexEvaluator = utils.regexEvaluator;
	var errorCodes = options._errorCodes;

	var Experiment = _model;

	router.param(regexEvaluator);
	
	// Create
	router.post('/', createExperiment);

	// Read
	router.get('/', getExperiments);

	// Parameters for Read (GET)
	router.param('patientId', /^[a-z0-9]{24}$/);
	router.param('studyId', /^[a-z0-9]{24}$/);
	router.param('experimentNumber', /^[0-9]{1,4}$/);
	
	// Read with multiple parameters
	router.get('/:experimentNumber/:patientId/:studyId', getExperimentWithConditions);

	// Read
	router.param('experimentId', /^[a-z0-9]{24}$/);
	router.get('/:experimentId', getExperimentWithId);

	// Update
	router.put('/:experimentId', updateExperimentWithId);

	// Update with conditions
	router.put('/:experimentNumber/:patientId/:studyId', updateExperimentWithConditions);

	// Delete
	router.delete('/:experimentId', deleteExperimentWithId);

	// Delete with conditions
	router.delete('/:experimentNumber/:patientId/:studyId', deleteExperimentWithConditions);	

	function createExperiment (req, res, next) {
		var _number = req.body.number;
		if(_number === undefined) {
			var err = new Error('Experiment number not specified. in Create');
			err.name = errorCodes.PostError;
			next(err);
		}
		var _firstGraspTime = req.body.firstGraspTime;
		var _finalGraspTime = req.body.finalGraspTime;
		var _intervals = req.body.intervals === undefined ? [] : req.body.intervals;
		var _numGrasps = _intervals.length; //req.body.numGrasps === undefined ? ; 
		var _points = req.body.points === undefined ? [] : req.body.points;
		var experiment = {
			number : _number,
			firstGraspTime : _firstGraspTime,
			finalGraspTime : _finalGraspTime,
			intervals : _intervals,
			numGrasps : _numGrasps,
			points : _points
		};

		Experiment.createExperiment(experiment, function (err, _experiment){
			var _error = determineErrorType(err, res, next, null, 
					errorCodes.PostError, _experiment);
			if (_error) return next(_error);

			res.status(200).json(_experiment);


		});
	}

	function getExperimentWithId(req, res, next) {
		var id = req.params.experimentId;
		if (id === undefined) {
			var err = new Error('Experiment id not defined in Get');
			err.name = errorCodes.ParamError;
			next(err);
		}
		Experiment.findExperimentWithId(id, function (err, experiment) {
			var x = determineErrorType(err, res, next, 
					id, errorCodes.GetError, experiment); 
			if (x) return next(x);

			res.status(200).json(experiment);
		});

	}

	function getExperiments (req, res, next) {
		Experiment.findAllExperiments(function (err, experiments) {
			var x = determineErrorType(err, res, next, 
					null, errorCodes.GetError, experiments);
			if (x) return next(x);

			res.status(200).json(experiments);
		});
	}

	function getExperimentWithConditions (req, res, next) {
		var _conditions = {
			number : Number(req.params.experimentNumber),
			studyId : String(req.params.studyId),
			patientId : String(req.params.patientId)
		};
		if (_conditions === undefined) {
			var err = new Error('Params not set for create experiment');
			err.name = errorCodes.ParamError;
			next(err);
		}
		Experiment.findExperimentWithConditions(_conditions, function(err, _experiment) {
			var _error = determineErrorType(err, res, next, null,
					errorCodes.PostError, _experiment);
			if (_error) return next(_error);

			res.status(200).json(_experiment);

		});

	}

	function updateExperimentWithId(req, res, next) {
		var id = req.params.experimentId;
		if(id === undefined) {
			var err = new Error('Experiment id undefined for Update operation');
			err.name = errorCodes.ParamError;
			return next(err);
		}
		var updateObject = req.body;
		Experiment.updateExperimentWithId(id, updateObject, function (err, updatedExperiment) {
			var x = determineErrorType(err, res, next, id, 
					errorCodes.PutError, updatedExperiment);
			if (x) return next(x);
			res.status(200).json(updatedExperiment);
		});
	}

	function updateExperimentWithConditions(req, res, next) {
		var _conditions = {
			number : Number(req.params.experimentNumber),
			studyId : String(req.params.studyId),
			patientId : String(req.params.patientId)
		};

		Object.keys(_conditions).forEach(function (val, ind, arr) {
			if (_conditions[val] === undefined) {
				var err = new Error (val + ' not set for conditions to update experiment');
				err.name = errorCodes.ParamError;
				return next(err);
			}
		});

		var updateObject = req.body;
		Experiment.updateExperimentWithConditions(_conditions, updateObject,
			function (err, updatedExperiment) {
				var x = determineErrorType(err, res, next, null, 
					errorCodes.UpdateError, updatedExperiment);
				if (x) return next(x);
				res.status(200).json(updatedExperiment);
		});
	}

	function deleteExperimentWithId(req, res, next) {
		var id = req.params.experimentId;
		if (id === undefined) {
			var err = new Error('Experiment id undefined for delete operation');
			err.name = errorCodes.ParamError;
			return next(err);
		}
		Experiment.deleteExperimentWithId(id, function(err, experiment) {
			var x = determineErrorType(err, res, next, null,
					errorCodes.DeleteError, experiment);
			if (x) return next(x);
			
			var _experiment = {};
			_experiment._id = experiment._id;
			_experiment.number = experiment.number;
			_experiment.patientId = experiment.patientId;
			_experiment.studyId = experiment.studyId;	
			res.status(200).json(_experiment);
		});
	}

	function deleteExperimentWithConditions(req, res, next) {
		var _conditions = {
			number : req.params.experimentNumber,
			patientId : req.params.patientId,
			studyId : req.params.studyId
		};

		if (isParamUndefined(_conditions)){
			var err = new Error('Conditions object incomplete for deletion.');
			err.name = errorCodes.ParamError;
			return next(err);
		}

		Experiment.deleteExperimentWithConditions(conditions, function (err, experiment) {
			var x = determineErrorType(err, res, next, null,
					errorCodes.DeleteError, experiment);
			if (x) return next(x);

			var _experiment = {};
			_experiment._id = experiment._id;
			_experiment.number = experiment.number;
			_experiment.patientId = experiment.patientId;
			_experiment.studyId = experiment.studyId;
			res.status(200).json(_experiment);
		});
	}

	function isParamUndefined(object) {
		Object.keys(object).forEach(function (val, ind, arr) {
			if (object[val] === undefined) {
				return true;
			}
		});

		return false;
	}

	function determineErrorType(err, res, next, id, errCode, item) {
		var x;
		if (err) {
			res.status(500);
			x = err;
		} else if (!item) {
			res.status(404);
			var e = new Error('Experiment: ' + id + ' not found.');
			x = e;
		}

		return x;
	}
		
	return router;

};
 
