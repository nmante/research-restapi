/**
 * Nii Mante
 * 
 * Study Schema
 *
 */

var studies = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	var studySchema = new Schema({
		name : { type : String, index : { unique : true, required : true } },
		patients : [{ type : Schema.ObjectId, ref : 'Patient' }]
	});

	var _model = mongoose.model('Study', studySchema, 'studies');

	return {
		model : _model,
		schema : studySchema
	};

}();


module.exports = studies;
