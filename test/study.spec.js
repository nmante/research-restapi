module.exports = function (appUrl, models){
	// Include super agent library.  It encapsulates HTTP
	// Methods and makes it easy to GET/POST/DEL data 
	var superagent = require('superagent');

	// 'expect gives us tdd style assertions
	var expect = require('expect.js');

	// 'should' gives us bdd style assertions
	var should = require('should');
	
	var Study = models.studies;
	var Patient = models.patients;

	describe('Study Route tests', function(){
		var sId, sName;

		before(function(done) {
			var query = Study.remove({});
			query.exec();

			var cStudy = new Study();
			cStudy.name = 'Vibrotactile Study';
			Study.create(cStudy, function(err, study) {
				if (err) {
					console.log(err.name + ': ' + err.message);
					done(err);
				}
				sId = study._id;
				sName = study.name;
				done();
			});
		});

		after(function(done) {
			var query = Study.remove({});
			query.exec();

			var query2 = Patient.remove({});
			query2.exec();
			done();
		});

		it('creates (POST) a study to the api/v1/studies route', function(done) {
			var study = {};
			study.name = 'Sound Study';
			superagent
			.post(appUrl + 'api/v1/studies')
			.send(study)
			.end(function (err, res) {
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
				expect(res.body.name).to.eql('Sound Study');
				done();
			});
		});

		it('finds (GET) all the studies from the api/v1/studies route', function(done) {
			superagent
			.get(appUrl + 'api/v1/studies')
			.end(function (err, res) {
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
				expect(res.body.map(function(item) {
					return item.name;
				})).to.contain(sName);
				done();
			});
		});

		it('finds (GET) a study from the api/v1/studies/:id route', function(done) {
			superagent
			.get(appUrl + 'api/v1/studies/' + sId)
			.end(function (err, res) {
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
				expect(res.body._id).to.eql(String(sId));
				done();
			});

		});

		it('updates (PUT) a study at the api/v1/studies/:id route', function(done) {
			var updateStudyObject = {};
			updateStudyObject.name = 'My Study';
			superagent
			.put(appUrl + 'api/v1/studies/' + sId)
			.send(updateStudyObject)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
				expect(res.body.name).to.eql('My Study');
				expect(res.body._id).to.eql(String(sId));
				done();
			});
		});

		it('deletes (DEL) a study at the api/v1/studies/:id route', function(done) {
			superagent
			.del(appUrl + 'api/v1/studies/' + sId)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
				expect(res.body._id).to.eql(String(sId));
				done();
			});
		});
	});

}
