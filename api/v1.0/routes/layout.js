var mongoose = require('mongoose')
  , Layout = mongoose.model('Layout')


exports.list = function(req, res){
  console.log("Layout Listing");
  Layout.find().sort('title').exec(function(err, layouts){
        res.send(layouts);
    });
};

exports.create = function(req, res){
	var newLayout = new Layout(req.body);
	newLayout.save(function(err, layout) {
		if (err) {
			console.log(error)
		} else {
			res.send(layout);
		}
	});
};

exports.removeOne = function(req, res) {
	console.log("Removing the layout");
	Layout.findByIdAndRemove(req.params.id, function(err) {
		if (err)
			res.send(400);
		else {
			res.send(200);
		}
	});
};

exports.edit = function(req, res) {
	console.log("Editing the layout");
	Layout.findById(req.params.id, function(err, layout) {
		if (err)
			res.send(400);
		else {
			layout.title = req.body.title;
			layout.file = req.body.file;
			layout.update = new Date();
			layout.save();
			res.send(200);
		}
	});
};
 
 