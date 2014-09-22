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
var db = mongoose.createConnection('mongodb://localhost:27017/research_test');

describe('Express REST Api server.', function(){
	//var url = 'http://localhost:3000/';
	var url = '';

	// Patient test functions
	describe('Patient tests', function(){
		var id;
		var cPatient = null;
		var Patient = models.patients;
		cPatient = new Patient();
		beforeEach(function(){
		//beforeEach(function(done){	
			// Add some test objects to our DB 
			// in this module
			cPatient.name = 'EB';
			cPatient.age = 74;
			console.log(cPatient);
			cPatient.save(function (err) {
				console.log('Saving patient :' + cPatient);
				if (err) {
					console.log('Error saving patient');
				} 
				//done();
			});

			
		});
/*
		it('creates(POST) a patient at api/v1/patients route', function(done){
			superagent
				.post(url + 'api/v1/patients')
				.send(cPatient)
				.end(function(err, res) {
					err.should.equal(null);
					res.body.length.should.equal(0);
					id = res.body[0]._id;
					res.should.have.status(404);
					done();
				});
		});
*/
		it('finds (GET) all of the patients at the api/v1/patients route',function(done) {
			superagent
				.get('/api/v1/patients')
				.end(function(err, res) {
					expect(err).to.eql(null);
					expect(res.body.length).to.be.above(0);
					expect(res.body.map(function (item){
						return item.name;
					})).to.contain(cPatient.name);
				});
		});

		afterEach(function(done){
			// Remove all the test objects so we don't
			// affect any other modules
			
			var query = Patient.remove({});
			query.exec();
			done();
		});	

	});
		
	// Experiment test Functions
	describe('Experiment tests', function(){
		var cExperiment = null;
		
	});


	
	// Studies test functions 
	describe('Study Route tests', function(){
		var cStudy = null;

	});
});
