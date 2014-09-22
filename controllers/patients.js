/**
 * Nii Mante
 *
 * Patients Route Setup
 */

module.exports = function patientRouter (_app, _config, _utils, _model) {

	var express = require('express');
	var router = express.Router();
	//var model = require('./../models/models.js');
	
	var model = _model;


	// Figure out way to use mongoose model

	var createPatient = function (req, res) {

	};

	var getPatient = function (req, res) {

	};

	var getPatients = function (req, res) {
		// Set the response headers
		res.set({
			'Content-Type' : 'application/json'
		});
		var patients = _model.methods.findAll();
		res.status(200).send(patients);
	};

	var updatePatient = function (req, res) {

	};

	var deletePatient = function (req, res) {

	};
	console.log(getPatients);

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
