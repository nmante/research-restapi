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

	var createPatient = function (req, res, next) {
		var _name = req.name
	};

	var getPatientByName = function (req, res, next) {
		var _name = req.params.name;
		console.log('Name');
		console.log(_name);
		model.find({ name : _name}, function (err, patient) {
			if (err) {
				next(err);
			}
			else if (!patient) {
				return next(new Error('Error finding patient.'));
			}

			res.set({ 'Content-Type' : 'application/json' });
			res.status(200).send(patient);
			/*
			req.patient = patient;
			next();
			*/
		});

	};

	var getPatientById = function (req, res, next) {
		var id = req.params.id;
		model.find({ _id : id }, function (err, patient) {
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

	var getPatients = function (req, res, next) {
		// Set the response headers
		res.set({
			'Content-Type' : 'application/json'
		});

		// Use the custom findAll method we attached to the model
		model.findAll(function (err, patients) {
			if (err) {
				next(err);
			}
			console.log('No errors in patient');
			res.status(200).json(patients);
		});
	};

	var updatePatient = function (req, res) {

	};

	var deletePatient = function (req, res) {

	};

	/*
	 * We can pass an 'id' or a 'name' to our routes to find
	 * a specific patient.
	 */


	router.param(function(name, fn) {
		console.log('Regexp param');
		console.log(name);
		console.log(fn);
		if (fn instanceof RegExp) {
			return function (req, res, next, val) {
				var capture;
				// Check if the regex matches the value
				// return it to our capture variable
				if (capture = fn.exec(String(val))) {
					console.log('Name');
					console.log(name);
					console.log('capture');
					console.log(capture);
					req.params[name] = capture;
					next();
				} else {
					// No match, so we should go to the next
					// route
					next('route');
				}
			}
		}
	});
	/*
	router.param('id', function(req, res, next, id) {
		model.find({ _id : id }, function (err, patient) {
			if (err) {
				next(err);
			}
			else if (!patient) {
				
			}
			req.patient = patient;
			next();

		});
	});
	*/

	
	
	/*
	router.param('name', function(req, res, next, _name) {
		model.find({ name : _name}, function (err, patient) {
			if (err) {
				next(err);
			}
			else if (!patient) {
				return next(new Error('Error finding patient.'));
			}

			req.patient = patient;
			next();
		});
	});
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
	router.delete('/:name', deletePatient);

	return router;
};
