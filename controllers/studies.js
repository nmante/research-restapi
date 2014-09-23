/**
 * Nii Mante
 *
 * Study Routing
 *
 */

module.exports = function studyRouter (_app, _config, _utils, _model) {

	var express = require('express');
	var router = express.Router();
	var model = _model;

	var getStudies = function(req, res) {
		model.findAll(function(err, studies) {
			res.status(200).send(studies);
		});

	};

	router.get('/', getStudies);

	return router;

}
