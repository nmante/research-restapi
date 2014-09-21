/**
 * Nii Mante
 *
 * Patient Schema
 *
 */

var patient = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

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

	var createPatientWithNameAndAge = function(name, age){
		
	};

	var _model = mongoose.model('Patient', patientSchema, 'patients');
	return {
		model : _model,
		schema : patientSchema

	};


}();

module.exports = patient;
