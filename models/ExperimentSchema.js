/**
 * Nii Mante
 *
 * Experiment Schema
 *
 */

var Experiments = function(){

	var mongoose = require('mongoose');
	var Schema = require('mongoose').Schema;

	var experimentSchema = new Schema({
		name : {
			type: String, 
			index : { unique : true, required : true }
		},
		age : Number,
		impairment : {
			cause : String,
			level : String
		},
		studies : { type: Schema.ObjectId, ref : 'Study'},
		patients : { type : Schema.ObjectId, ref : 'Patient' },
		points : [{
			x : Number,
			y : Number, 
			width : Number, 
			height : Number,
			fsTimeStamp: String,
			timeStamp : String,
			soundCode : Number	

		}]

	});

	var _model = mongoose.model('Experiment', experimentSchema, 'experiments');
	return _model;

	/*
	return {
		schema : experimentSchema,
		model : _model
	};
	*/

}();

module.exports = Experiments;
