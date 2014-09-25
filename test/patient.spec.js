
module.exports = function (url, model){
	
	// Include super agent library.  It encapsulates HTTP
	// Methods and makes it easy to GET/POST/DEL data 
	var superagent = require('superagent');

	// 'expect gives us tdd style assertions
	var expect = require('expect.js');

	// 'should' gives us bdd style assertions
	var should = require('should');

	describe('Patient tests', function(){
		var id;
		var cPatient = null;
		var Patient = model;
		cPatient = new Patient();

		//beforeEach(function(done){	
		before(function(done){
			// Add some test objects to our DB 
			// in this module
			cPatient.name = 'EB';
			cPatient.age = 74;
			cPatient.save(function (err) {
				if (err) {
					console.log(err.name + ': ' + err.message);
					done();
				} 
				done();
			});

			
		});
	
		it('creates(POST) a patient at api/v1/patients route', function(done){
			// Let's create a patient without the model
			// This'll simulate creating a json object on a client
			// Then we'll post the json object using the super agent send function
			var patient = {};
			patient.name = 'JV';
			patient.age = 57;
			superagent
				.post(url + 'api/v1/patients')
				.send(patient)
				.end(function(err, res) {
					expect(err).to.eql(null);
					id = res.body._id;
					expect(id).to.not.eql(null);
					expect(res.body.name).to.eql(patient.name);
					expect(res.status).to.eql(200);
					done();
				});
		});
	
		it('finds (GET) a patient with a specific name at the api/v1/patients/:name route',
		function(done) {
			superagent.get(url + 'api/v1/patients/EB')
				.end(function(err, res) {
					expect(err).to.eql(null);
					expect(res.body.length).to.eql(1);
					expect(res.body.map(function (item) {
						return item.name;
					})).to.contain(cPatient.name);
					console.log(res.body);
					done();
				});
		});



		it('finds (GET) all of the patients at the api/v1/patients route',function(done) {
			var patient2 = new Patient();
			patient2.name = 'RT';
			patient2.age = 40;
			patient2.save(function(err) {
				if (err) {
					done(err);
				}
				superagent
				.get(url + 'api/v1/patients/')
				.end(function(err, res) {
					/*if (err) {
						console.log(err);
						done();
					}*/
					expect(err).to.eql(null);
					expect(res.body.length).to.be.above(0);
					expect(res.body.map(function (item){
						return item.name;
					})).to.contain(cPatient.name);
					expect(res.body.map(function (item) {
						return item.name;
					})).to.contain(patient2.name);

					console.log(res.body);
					done();
				});

			});
						
		});

		//afterEach(function(done){
		after(function(done) {	
			// Remove all the test objects so we don't
			// affect any other modules
			
			Patient.remove(function (err) {
				if (err) {
					console.log(err.name + ': ' + err.message); 
					done(err);
				}
				done();
			});
		});	

	});

}
