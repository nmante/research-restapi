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
	var model = _model;

	var getExperiments = function (req, res) {
		res.set({
			'Content-Type' : 'application/json'
		});
		model.findAll(function (err, experiments) {
			res.status(200).send(experiments);
		});
	};
	router.get('/', getExperiments);
	
	return router;

};
 
