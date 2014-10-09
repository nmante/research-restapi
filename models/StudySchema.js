/**
 * Nii Mante
 * 
 * Study Schema
 *
 */

var studies = function(options){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	var modelName = 'Study';
	var studySchema = new Schema({
		name : { type : String, index : { unique : true, required : true } },
		patients : [{ type : Schema.ObjectId, ref : 'Patient' }]
	});

	studySchema.statics.createStudy = function(study, cb) {
		this.create(study, cb);
	};

	studySchema.statics.findAllStudies = function (cb) {
		this.find({}, cb);
	};

	studySchema.statics.findStudyById = function (id, cb) {
		this.findById(id, cb);
	};

	studySchema.statics.updateStudyById = function (id, study, cb) {
		this.findByIdAndUpdate(id, study, cb);
	};

	studySchema.statics.deleteStudyById = function (id, cb) {
		this.findByIdAndRemove(id, cb);
	};

	var _model; 

	try {

		if (mongoose.model(modelName)){
			_model = mongoose.model(modelName);
		}

	} catch(err) {

		if (err.name === 'MissingSchemaError') {
			//var schema = new schema(schemaobject);
			_model = mongoose.model(modelName, studySchema, 'studies');
		}

	}
	
	return _model;


}();


module.exports = studies;
