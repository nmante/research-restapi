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

	patientSchema.statics.createPatient = function (patientDoc, callback) {
		this.create(patientDoc, callback);
	};

	/* Search the patient collections by name */
	patientSchema.statics.findPatientByName = function (_name, callback) {
		this.find({ name : new RegExp(_name, 'i') }, callback);
	};

	// Grab all of the patients in the database
	patientSchema.statics.findAllPatients = function(callback) {
		this.find({}, callback);
	};

	patientSchema.statics.updatePatientById = function(id, updateObject, callback) {
		this.findByIdAndUpdate(id, updateObject, callback);
	};

	patientSchema.statics.updatePatientByName = function(_name, updateObject, callback) {
		this.findOneAndUpdate({ name : _name }, updateObject, callback);
	};

	patientSchema.statics.removePatientByName = function(_name, callback){
		this.findOneAndRemove({ name : _name }, callback); 

	};

	patientSchema.statics.removePatientById = function(id, callback) {
		this.findByIdAndRemove( id, callback);
	};

	/*
	 * Check to see if our model has been created already
	 *
	 * If it has, then we'll just return it
	 * If it hasn't, then we'll create the model based on our schema above 
	 */

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
	
}();

module.exports = patient;
