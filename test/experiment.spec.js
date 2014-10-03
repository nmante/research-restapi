module.exports = function (appUrl, models){
	// Include super agent library.  It encapsulates HTTP
	// Methods and makes it easy to GET/POST/DEL data 
	var superagent = require('superagent');

	// 'expect gives us tdd style assertions
	var expect = require('expect.js');

	// 'should' gives us bdd style assertions
	var should = require('should');

	// Our model for manipulating objects on the database
	var Experiment = models.experiments;
	var Patient = models.patients;

	describe('Experiment Route tests', function(){

		var cExperiment = null;
		var pName1, pId1;
		var pName2, pId2;
		var eNumber, eId;

		// Run this segment before the tests start
		before(function (done) {
			var query = Experiment.remove({});
			query.exec();
			var query2 = Patient.remove({});
			query2.exec();


			var cPatient1 = new Patient();
			cPatient1.name = 'EB';
			cPatient1.age = 70;
			var cPatient2 = new Patient();
			cPatient2.name = 'RA';
			cPatient2.age = 50;

			var patients = [cPatient1, cPatient2];
			Patient.create(patients, function (err, patient1, patient2) {
				if (err){
					console.log(err.name + ': ' + err.message);
					done(err);
				}
				pId1 = patient1._id;
				pId2 = patient2._id;
				pName1 = patient1.name;
				pName2 = patient2.name;

				// Insert the items into the db
				var tExperiment = new Experiment();
				tExperiment.number = 1;
				tExperiment.firstGraspTime = 1.55;
				tExperiment.finalGraspTime = 8.3;
				tExperiment.intervals = [1.55, 1.45, 3.53, 1.76];

				Experiment.createExperiment(tExperiment, function (err, experiment) {
					if (err) {
						console.log(err.name + ': ' + err.message);
						done(err);
					}
					eNumber = experiment.number;
					eId = experiment._id;
					done();
				});

			});
				
		});


		it('creates (POST) an experiment at api/v1/experiments route', function(done) {

			var experiment = {};
			experiment.number = 4;
			experiment.firstGraspTime = 2;
			experiment.finalGraspTime = 20;
			experiment.intervals = [2, 5, 10, 3];
			superagent
			.post(appUrl + 'api/v1/experiments')
			.send(experiment)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
				expect(res.body.number).to.eql(4);
				expect(res.body.intervals[1]).to.eql(5);
				done();
			});
			
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
			Experiment.remove(function (err) {
				if (err) {
					console.log(err);
					done(err);
				}
				Patient.remove(function (err) {
					if (err) {
						done(err);
					}
					done();
				});

			});

		});
	});

}
