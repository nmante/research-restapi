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

	router.param('patientId', /^[a-z0-9]{24}$/);
	router.param('studyId', /^[a-z0-9]{24}$/);
	router.param('experimentNumber', /^[0-9]{1,4}^/);
	

	var getExperiments = function (req, res) {
		res.set({
			'Content-Type' : 'application/json'
		});
		Experiment.findAll(function (err, experiments) {
			res.status(200).send(experiments);
		});
	};
	router.get('/', getExperiments);
	
	return router;

};
 
