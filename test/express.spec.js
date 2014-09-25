/**
 * Nii Mante
 * Research backend test suite
 *
 * This code will be responsible for running each test for each route.
 * Each routes api tests will be placed in the same directory as the route. 
 *
 * i.e.
 * express.test.js
 * routes/
 * 	patient/
 * 		- patient.test.js
 * 	subject/
 * 		- subject.test.js
 *
 * And so on and so forth
 * 
 */

// Include super agent library.  It encapsulates HTTP
// Methods and makes it easy to GET/POST/DEL data 
var superagent = require('superagent');

// 'expect gives us tdd style assertions
var expect = require('expect.js');

// Include 'mongoose' so we can access the database
// Using this instead of creating Mock objects for now
var mongoose = require('mongoose');

// 'should' gives us bdd style assertions
var should = require('should');

// Grab our models
var models = require('./../models/models.js')();

// Connect to our db so we can create and destroy objects at will
// TODO make sure this only tries to connect once!!!!
var db;
try {
	db = mongoose.connect('mongodb://localhost:27017/research_test');
} catch (e) {
	console.log(e.name + ': ' + e.message);
}


describe('Express REST Api server.', function(){
	//this.timeout(0);
	var url = 'http://localhost:3000/';
	//var url = '';

	// Patient test functions
	require('./patient.spec')(url, models.patients);
	
	// Experiment test Functions
	require('./experiment.spec')(url, models.experiments);
	
	// Studies test functions 
	require('./study.spec')(url, models.studies);
	
});
