/**
 * Nii Mante
 *
 * Patient Schema
 *
 */

var patient = function(options){

	var mongoose = require('mongoose');

	//console.log(options._config.database);
	//console.log(options._config.database);
	//var mongoose = options._mongoose;
	var Schema = mongoose.Schema;
	var modelName = 'Patient';

	var schemaObject = {
		name : { type : String, index : { unique : true, required : true } },
		age : Number,
		impairment : {
			cause : String,
			level : String
		},
		modified : { type : Date, default : Date.now },
		studies : [{ type : Schema.ObjectId, ref : 'Study' }],
		experiments : [{ type : Schema.ObjectId, ref : 'Experiment' }]
	};

	var patientSchema = new Schema(schemaObject);

	var create = function(name, age){

	};

	patientSchema.methods.create = create;

	patientSchema.statics.findByName = function (name, cb) {
		this.find({name : new RegExp(name, 'i') }, cb);
	};

	patientSchema.statics.findAll = function(cb) {
		return this.find({}, cb);
		
	};

	var _model;

	try {
		if (mongoose.model(modelName)){
			_model = mongoose.model(modelName);
		}	
	} catch(err) {
		if (err.name === 'MissingSchemaError') {
			//var schema = new Schema(schemaObject);
			_model = mongoose.model(modelName, patientSchema, 'patients');
		}

	}
	//var _model = mongoose.model('Patient', patientSchema, 'patients');

	


	
	return _model;	
	/*
	return {
		model : _model,
		schema : patientSchema

	};
	*/

}();
//};

module.exports = patient;
