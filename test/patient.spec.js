
module.exports = function (url, model){
	
	// Include super agent library.  It encapsulates HTTP
	// Methods and makes it easy to GET/POST/DEL data 
	var superagent = require('superagent');

	// 'expect gives us tdd style assertions
	var expect = require('expect.js');

	// 'should' gives us bdd style assertions
	var should = require('should');

	describe('Patient tests', function(){
		var id, updateId, updateName;
		var cPatient = null;
		var Patient = model;
		cPatient = new Patient();

		//beforeEach(function(done){	
		before(function(done){
			// Add some test objects to our DB 
			// in this module

			// Make sure the db is empty
			var query = Patient.remove({});
			query.exec();
			cPatient.name = 'EB';
			cPatient.age = 74;

			var updatePatient = new Patient();
			updatePatient.name = 'RA';
			updatePatient.age = 43;

			var patients = [ cPatient, updatePatient ];
			//var patients = [ { name : 'EB', age : 74 } , { name : 'RA', age : 43 }];
			Patient.create(patients, function (err, patientForGet, patientForUpdate) {
				if (err) {
					console.log(err.name + ': ' + err.message);
					done();
				}
				id = patientForGet._id;
				updateId = patientForUpdate._id;
				updateName = patientForUpdate.name;
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
					expect(err).to.eql(null);
					expect(res.body.length).to.be.above(0);
					expect(res.body.map(function (item){
						return item.name;
					})).to.contain(cPatient.name);
					expect(res.body.map(function (item) {
						return item.name;
					})).to.contain(patient2.name);
					done();
				});

			});
						
		});

		it('updates (PUT) an existing patient at the api/v1/patients/:name route', function (done) {
			// use an id that we've gotten previously 
			// change some data for that item
			
			var updatePatient = {}; 
			updatePatient.name =  'Updated';
			updatePatient.age = 13;
			
			console.log('Patient Name to be updated');
			console.log(updateName);
			superagent
			.put(url + 'api/v1/patients/' + updateName)
			.send(updatePatient)
			.end(function (err, res){

				// Should be no error here
				expect(err).to.eql(null);
				console.log(res.body);

				// We should have found the object with the same id
				expect(res.body._id).to.eql(String(updateId));

				// The patients name should equal 'Updated'
				expect(res.body.name).to.eql(updatePatient.name);

				// We want a 200 response to say everything's okay
				expect(res.status).to.eql(200);
				done();

			});

		});

		it('updates (PUT) a patient at the api/v1/patients/:id route', function (done) {
			var updatePatient = {}; 
			updatePatient.name =  'Updated Again';
			updatePatient.age = 25;
			
			superagent
			.put(url + 'api/v1/patients/' + updateId)
			.send(updatePatient)
			.end(function (err, res){

				// Should be no error here
				expect(err).to.eql(null);

				// The patient should have the correct id 
				expect(res.body._id).to.eql(String(updateId));

				// The patient should name should equal 'Updated Again' 
				expect(res.body.name).to.eql(updatePatient.name);

				expect(res.body.age).to.eql(updatePatient.age);

				// We want a 200 response to say everything's okay
				expect(res.status).to.eql(200);
				done();
			});

		});



		it('removes (DELETE) a patient at the api/v1/patients/:name route', function (done) {
			superagent
			.del(url + 'api/v1/patients/' + cPatient.name)
			.end(function (err, res) {
				expect(res.body.name).to.eql(cPatient.name);
				expect(res.status).to.eql(200);
				done();
			});
		});

		it('removes (DELETE) a patient at the api/v1/patients/:id route', function (done) {
			superagent
			.del(url + 'api/v1/patients/' + id)
			.end(function (err, res) {
				expect(res.body._id).to.eql(id);
				expect(res.status).to.eql(200);
				done();
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
