var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var DashboardSchema = new Schema({
	title: String,
	layout: {type: Schema.Types.ObjectId, ref: 'Layout'},
	graph: {type: Schema.Types.ObjectId, ref: 'Graph'},
	filter_predefined: String,
	filter_ui: String,

	//Timestamps
	updated: {type: Date, default: Date.now},
	created: {type: Date, default: Date.now},

});

mongoose.model('Dashboard', DashboardSchema);