/**
 * Nii Mante
 *
 * Patients Route Setup
 */

module.exports = function patientRouter (options, _model) {

	var express = require('express');
	var router = express.Router();
	
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
	router.put('/:name', updatePatient);

	// Remove a patient
	router.delete('/:name', deletePatientByName);
	router.delete('/:id', deletePatientById);


	function createPatient (req, res, next) {
		var name = req.body.name;
		if (name === undefined) {
			// return error to client
			// couldn't create cause we need the name
			// this error should be caught on client,
			// but just being thorough
			next(err);
		}	
		var age = req.body.age;
		var cause = req.body.impairment.cause || 'Define the impairment cause';
		var level = req.body.impairment.level || 'Define the impairment level';
		var studies = req.body.studies || 'This patient isn\'t apart of any studies';
		var experiments = req.body.experiments || 'This patient doesn\'t have any experiments';
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
			res.status(200).send(_patient._id);
		});

	};

	function getPatientByName (req, res, next) {
		var _name = req.params.name;
		Patient.findPatientByName(_name, function (err, patient) {
			if (err) {
				next(err);
			}
			else if (!patient) {
				return next(new Error('Error finding patient.'));
			}

			res.set({ 'Content-Type' : 'application/json' });
			res.status(200).send(patient);
		});
	};

	function getPatientById (req, res, next) {
		// Grab the id from our request body
		var id = req.params.id;
		Patient.findById(id, function (err, patient) {
			if (err) {
				next(err);
			}
			else if (!patient) {
				//res.status(404).send(;	
			}
			
			res.set( { 'Content-Type' : 'application/json' });
			res.status(200).send(patient);
		});
	}

	function getPatients (req, res, next) {
		// Set the response headers
		res.set({
			'Content-Type' : 'application/json'
		});

		// Use the custom findAll method we attached to the model
		Patient.findAllPatients(function (err, patients) {
			if (err) {
				next(err);
			}
			res.status(200).json(patients);
		});
	}

	function updatePatient (req, res) {

	}

	function deletePatientById (req, res, next) {
		var id = req.params.id;
		if (id === undefined) {
			next(err);
		}
		Patient.removePatientById(id, function (err, patient) {
			res.status(200).send();
		});
	}

	function deletePatientByName (req, res, next) {
		var name = req.params.name;
		if (name === undefined) {
			next(err);
		}
		Patient.removePatientByName(name, function (err, patient) {
			res.status(200).send();
		});
	}

	/*
	 * We can pass an 'id' or a 'name' to our routes to find
	 * a specific patient.
	 */

	function regexEvaluator (name, fn) {
		if (fn instanceof RegExp) {
			return function (req, res, next, val) {
				var capture;
				// Check if the regex matches the value
				// return it to our capture variable
				if (capture = fn.exec(String(val))) {
					req.params[name] = capture;
					next();
				} else {
					// No match, so we should go to the next
					// route
					next('route');
				}
			}
		}
	}

	return router;
};
