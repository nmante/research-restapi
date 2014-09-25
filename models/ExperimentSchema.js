/**
 * Nii Mante
 *
 * Experiment Schema
 *
 */

var Experiments = function(options){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	var modelName = 'Experiment';
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

	experimentSchema.statics.findAll = function(cb) {
		return this.find({}, cb);
	};


	/*
	 * Check to see if our model has been created already
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
			//var schema = new Schema(schemaObject);
			_model = mongoose.model(modelName, experimentSchema, 'experiments');
		}

	}

	return _model;

}();

module.exports = Experiments;
