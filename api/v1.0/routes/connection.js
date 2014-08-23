var mongoose = require('mongoose')
  , Connection = mongoose.model('Connection')


exports.list = function(req, res){
  console.log("Connection Listing");
  Connection.find().sort('title').exec(function(err, connections){
        res.send(connections);
    });
};

exports.create = function(req, res){
	var newConnection = new Connection(req.body);
	newConnection.save(function(err, connection) {
		if (err) {
			console.log(error)
		} else {
			res.send(connection);
		}
	});
};

exports.removeOne = function(req, res) {
	console.log("Removing the connection");
	Connection.findByIdAndRemove(req.params.id, function(err) {
		if (err)
			res.send(400);
		else {
			res.send(200);
		}
	});
};

exports.edit = function(req, res) {
	console.log("Editing the connection");
	Connection.findById(req.params.id, function(err, connection) {
		if (err)
			res.send(400);
		else {
			connection.title = req.body.title;
			connection.file = req.body.file;
			connection.update = new Date();
			connection.save();
			res.send(200);
		}
	});
};
 
 