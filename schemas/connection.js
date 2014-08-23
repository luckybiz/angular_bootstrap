var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var ConnectionSchema = new Schema({
	title: String,
	type: String,
	dsn: String,
	username: String,
	password: String,

	//Timestamps
	updated: {type: Date, default: Date.now},
	created: {type: Date, default: Date.now},

});

mongoose.model('Connection', ConnectionSchema);