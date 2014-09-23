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
	studySchema.statics.findAll = function (cb) {
		return this.find({}, cb);
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
	/*
	return {
		model : _model,
		schema : studySchema
	};
	*/

}();
//};


module.exports = studies;
