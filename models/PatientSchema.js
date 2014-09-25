/**
 * Nii Mante
 *
 * Patient Schema
 *
 */

var patient = function(options){

	var mongoose = require('mongoose');

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

	patientSchema.methods.create = function (name, age, callback) {
		
	};

	patientSchema.statics.findByName = function (name, callback) {
		this.find({name : new RegExp(name, 'i') }, callback);
	};

	patientSchema.statics.findAll = function(callback) {
		this.find({}, callback);
	};

	var _model;

	try {
		if (mongoose.model(modelName)){
			_model = mongoose.model(modelName);
		}	
	} catch(err) {
		if (err.name === 'MissingSchemaError') {
			_model = mongoose.model(modelName, patientSchema, 'patients');
		} else {
			console.log(err.name + ": " + err.message);
		}
	}

	return _model;	
	/*
	return {
		model : _model,
		schema : patientSchema

	};
	*/

}();

module.exports = patient;
