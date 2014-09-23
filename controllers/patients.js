/**
 * Nii Mante
 *
 * Patients Route Setup
 */

//module.exports = function patientRouter (_app, _config, _utils, _model) {
module.exports = function patientRouter (options, _model) {

	var express = require('express');
	var router = express.Router();
	//var model = require('./../models/models.js');
	
	var model = _model;

	// Figure out way to use mongoose model

	var createPatient = function (req, res) {

	};

	var getPatient = function (req, res) {
		var _name = req.param.name;
		console.log('Patient Name');
		console.log(_name);
		model.findByName (_name, function (err, patient) {
		       res.status(200).send(patient);
		});
		/*
		model.find({ name : _name }, function (err, patient) {
		       res.status(200).send(patient);
		});
		*/

	};

	var getPatients = function (req, res) {
		// Set the response headers
		res.set({
			'Content-Type' : 'application/json'
		});
		//var patients = 
		model.findAll(function (err, patients) {
			console.log('Patients in controller');
			console.log(patients);
			res.status(200).send(patients);

		});
	};

	var updatePatient = function (req, res) {

	};

	var deletePatient = function (req, res) {

	};

	router.param('name', function(req, res, next, id) {
		model.find(id, function (err, name) {
			if (err) {
				return next(err);
			}
			else if (!name) {
				return next(new Error('failed to load user'));
			}

			req.name = name;
			next();
		});
	});

	// Create a patient
	router.post('/', createPatient);

	// Get all the patients
	router.get('/', getPatients);

	// Get a patient
	router.get('/:name', getPatient);

	// Update a patient
	router.put('/:name', updatePatient);

	// Remove a patient
	router.delete('/:name', deletePatient);

	return router;
};
