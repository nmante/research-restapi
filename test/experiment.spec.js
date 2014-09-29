module.exports = function (appUrl, model){
	// Include super agent library.  It encapsulates HTTP
	// Methods and makes it easy to GET/POST/DEL data 
	var superagent = require('superagent');

	// 'expect gives us tdd style assertions
	var expect = require('expect.js');

	// 'should' gives us bdd style assertions
	var should = require('should');

	// Our model for manipulating objects on the database
	var Experiment = model;

	describe('Experiment Route tests', function(){

		var cExperiment = null;
		// Run this segment before the tests start
		before(function (done) {
			done();

		});


		it('creates (POST) a experiment at api/v1/experiments route', function(done) {

			done();
		});

		it('finds (GET) an experiment at the api/v1/experiments/:id route', function(done) {

			done();
		});

		it('finds (GET) a experiment at api/v1/experiments/:name route', function(done) {

			done();
		});

		it('finds (GET) all the experiments at the api/v1/experiments route', function(done){
			
			done();
		});

		it('updates (PUT) an experiment at the api/v1/experiments/:id route', function(done) {

			done();
		});

		it('updates (PUT) an experiment at the api/v1/experiments/:name route', function(done) {

			done();
		});

		it('deletes (DELETE) an experiment at the api/v1/experiments/:id route', function(done){

			done();
		});

		it('deletes (DELETE) an experiment at the api/v1/experiments/:name route', function(done) {

			done();
		});

		// Run this after the tests start. Cleanup the database 
		after(function (done) {

			done();

		});
	});

}
