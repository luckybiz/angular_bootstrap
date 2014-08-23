var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var LayoutSchema = new Schema({
	title: String,
	file: String,

	//Timestamps
	updated: {type: Date, default: Date.now},
	created: {type: Date, default: Date.now},

});

mongoose.model('Layout', LayoutSchema);