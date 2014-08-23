var mongoose = require('mongoose')
  , Graph = mongoose.model('Graph')


exports.list = function(req, res){
  console.log("Graph Listing");
  Graph.find().sort('title').exec(function(err, graphs){
        res.send(graphs);
    });
};

exports.create = function(req, res){
	var newGraph = new Graph(req.body);
	newGraph.save(function(err, graph) {
		if (err) {
			console.log(error)
		} else {
			res.send(graph);
		}
	});
};

exports.removeOne = function(req, res) {
	console.log("Removing the graph");
	Graph.findByIdAndRemove(req.params.id, function(err) {
		if (err)
			res.send(400);
		else {
			res.send(200);
		}
	});
};

exports.edit = function(req, res) {
	console.log("Editing the graph", req.body);
	Graph.findByIdAndUpdate(req.params.id, {
		$set : req.body
	}, function(err, doc) {
		if (err)
			return console.log(err);
		else
			res.send(200);
	});

};
 
 