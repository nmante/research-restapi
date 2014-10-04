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
		number : Number,
		studyId : { type: Schema.ObjectId, ref : 'Study'},
		patientId : { type : Schema.ObjectId, ref : 'Patient' },
		finalGraspTime : Number,
		firstGraspTime : Number,
		intervals : [ Number ],
		numGrasps : Number,
		modified : { type : Date, default : Date.now },
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

	// Create 
	experimentSchema.statics.createExperiment = function(experiment, cb) {
		this.create(experiment, cb);
	};

	// Read
	experimentSchema.statics.findExperimentWithId = function(id, cb) {
		this.findById(id, cb);
	};

	// Read - pass params as an object 
	// e.g.
	// 	options = { number : _number, patientId : _pId, studyId : _sId } 
	experimentSchema.statics.findExperimentWithConditions = function(conditions, cb) {
		this.find(conditions, cb);
	};

	// Read
	experimentSchema.statics.findAllExperiments = function(cb) {
		this.find({}, cb);
	};

	// Update
	experimentSchema.statics.updateExperimentWithConditions = function(conditions, updateObject, cb) {
		this.findOneAndUpdate(conditions, updateObject, cb);
	};

	// Delete
	experimentSchema.statics.removeExperimentWithConditions = function(conditions, cb) {
		this.findOneAndRemove(condtions, cb);
	};

	/*
	 * Check to see if our model has been created already
	 * If it has, then we'll just it
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
