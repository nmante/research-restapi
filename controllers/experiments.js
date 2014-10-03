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

	
	
	router.post('/', createExperiment);
	router.get('/', getExperiments);


	router.param('patientId', /^[a-z0-9]{24}$/);
	router.param('studyId', /^[a-z0-9]{24}$/);
	router.param('experimentNumber', /^[0-9]{1,4}^/);
	router.get('/:experimentNumber/:patientId/:studyId', getExperimentWithConditions);


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

	function getExperiments (req, res, next) {
		Experiment.findAllExperiments(function (err, experiments) {
			var x = determineErrorType(err, res, next, 
					null, errorCodes.GetError, experiments);
			if (x) return next(x);

			res.status(200).json(experiments);
		});
	}

	function getExperimentWithConditions (req, res, next) {
		var _conditions = req.params;
		if (_conditions === undefined) {
			var err = new Error('Params not set for create experiment');
			err.name = errorCodes.CreateError;
			next(err);
		}
		Experiment.findExperimentWithConditions(_conditions, function(err, _experiment) {
			var _error = determineErrorType(err, res, next, null,
					errorCodes.PostError, _experiment);
			if (_error) return next(_error);

			res.status(200).json(_experiment);

		});

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
 
