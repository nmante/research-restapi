/**
 * Nii Mante
 *
 * Patients Route Setup
 */

module.exports = function patientRouter (options, _model) {

	var express = require('express');
	var router = express.Router();
	var utils = options._utils;
	var regexEvaluator = utils.regexEvaluator;
	
	var Patient = _model;

	// Tell router to check if a parameter matches a defined regex
	// :name and :id are the parameters we're checking against the regex 
	router.param(regexEvaluator);


	/*
	 * All of the route callbacks (i.e. createPatient, getPatients, etc.) are
	 * defined below the router http methods. Able to do this because of hoisting
	 */

	// Create a patient
	router.post('/', createPatient);

	// Get all the patients
	router.get('/', getPatients);

	// Get a patient by their id
	router.param('id', /^[a-z0-9]{24}$/);
	router.get('/:id', getPatientById);

	// Get a patient by their name
	router.param('name', /^[a-zA-Z]{2,4}$/);
	router.get('/:name', getPatientByName);

	// Update a patient
	router.put('/:name', updatePatientByName);
	router.put('/:id', updatePatientById);

	// Remove a patient
	router.delete('/:name', deletePatientByName);
	router.delete('/:id', deletePatientById);


	function createPatient (req, res, next) {
		var _name = req.body.name;
		if (_name === undefined) {
			// return error to client
			// couldn't create cause we need the name
			// this error should be caught on client,
			// but just being thorough
			next(err);
		}	
		var _age = req.body.age;
		var _impairment = req.body.impairment;		
		var _cause, _level;

		_cause = _impairment ? _impairment.cause : 'Define the impairment cause';
		_level = _impairment ? _impairment.level : 'Define the impairment level';

		var _studies = req.body.studies;
		var _experiments = req.body.experiments;
		var patient = {
			name : _name,
			age : _age,
			impairment : {
				cause : _cause,
				level : _level
			},
			studies : _studies,
			experiments : _experiments	
		};
			
		Patient.createPatient(patient, function(err, _patient) {
			if (err) {
				// If we failed in creating the patient,
				// pass the error along to our error handler
				next(err);
			}
			res.status(200).json(_patient);
		});

	}

	function getPatientByName (req, res, next) {
		var _name = req.params.name;
		Patient.findPatientByName(_name, function (err, patient) {
			if (err) {
				next(err);
			}

			res.status(200).json(patient);
		});
	}

	function getPatientById (req, res, next) {
		// Grab the id from our request body
		var id = req.params.id;
		Patient.findById(id, function (err, patient) {
			if (err) {
				next(err);
			}
			
			res.status(200).json(patient);
		});
	}

	function getPatients (req, res, next) {

		// Use the custom findAll method we attached to the model
		Patient.findAllPatients(function (err, patients) {
			if (err) {
				next(err);
			}
			res.status(200).json(patients);
		});
	}

	function updatePatientById (req, res, next) {
		// Find the resource with this id
		var id = req.params.id;

		// Update with the request that the client sent
		var updateRequestBody = req.body;
		if (id === undefined) {
			next(err);
		}

		// Find the resource at this id, then change the proerties
		// that need to be changed	
		Patient.updatePatientById(id, updateRequestBody, function (err, patient) {
			if (err) {
				next(err);
			}
			res.status(200).json(patient);
		});
	}

	function updatePatientByName (req, res, next) {
		// Find the resource with this name, then change the proerties
		// that need to be changed	
		var name = req.params.name;

		// Update with the request that the client sent
		var updateRequestBody = req.body;
		if (name === undefined) {
			next(err);
		}
		Patient.updatePatientByName(name, updateRequestBody, function (err, updatedPatient) {
			if (err) {
				next(err);
			}
			res.status(200).json(updatedPatient);
		});
	}

	function deletePatientById (req, res, next) {
		var id = req.params.id;
		if (id === undefined) {
			return next(err);
		}
		Patient.removePatientById(id, function (err, patient) {
			if (err) {
				return next(err);
			} else if (!patient) {
				var e = new Error('patient not found');
				e.name = 'DeleteError';
				return next(e);
			}

			// Once we delete on Mongo
			// Only return the id and name to the client
			var _patient = {};
			_patient.name = patient.name;
			_patient._id = patient._id;
			res.status(200).json(_patient);
		});
	}
	

	function deletePatientByName (req, res, next) {
		var name = req.params.name;
		if (name === undefined) {
			next(err);
		}
		Patient.removePatientByName(name, function (err, patient) {

			// Once we delete on Mongo
			// Only return the id and name to the client
			var _patient = {};
			_patient.name = patient.name;
			_patient._id = patient._id;
			res.status(200).json(_patient);
		});
	}

	return router;
};
