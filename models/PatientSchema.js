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

	var patientSchema = new Schema({
		name : { type : String, index : { unique : true, required : true } },
		age : Number,
		impairment : {
			cause : String,
			level : String
		},
		modified : { type : Date, default : Date.now },
		studies : [{ type : Schema.ObjectId, ref : 'Study' }],
		experiments : [{ type : Schema.ObjectId, ref : 'Experiment' }]
	});

	var create = function(name, age){

	};

	var findAll = function() {
		return this.model(modelName).find({});
		
	};

	patientSchema.methods.create = create;
	patientSchema.methods.findAll = findAll;

	
	var _model = mongoose.model('Patient', patientSchema, 'patients');

	


	
	return _model;	
	/*
	return {
		model : _model,
		schema : patientSchema

	};
	*/


}();

module.exports = patient;
