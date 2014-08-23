var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var GraphSchema = new Schema({
	title: String,
	description: String,
	connection: {type: Schema.Types.ObjectId, ref: 'Connection'},
	type: String,
	query: String,
	filter_predefined: String,
	filter_ui: String,
	post_process: String,
	config: String,

	//Timestamps
	updated: {type: Date, default: Date.now},
	created: {type: Date, default: Date.now},

});

mongoose.model('Graph', GraphSchema);