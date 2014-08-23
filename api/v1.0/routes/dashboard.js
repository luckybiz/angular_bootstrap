var mongoose = require('mongoose')
  , Dashboard = mongoose.model('Dashboard')


exports.list = function(req, res){
  console.log("Dashboard Listing");
  Dashboard.find().sort('title').exec(function(err, dashboards){
        res.send(dashboards);
    });
};

exports.create = function(req, res){
	var newDashboard = new Dashboard(req.body);
	newDashboard.save(function(err, dashboard) {
		if (err) {
			console.log(error)
		} else {
			res.send(dashboard);
		}
	});
};

exports.removeOne = function(req, res) {
	console.log("Removing the dashboard");
	Dashboard.findByIdAndRemove(req.params.id, function(err) {
		if (err)
			res.send(400);
		else {
			res.send(200);
		}
	});
};

exports.edit = function(req, res) {
	console.log("Editing the dashboard", req.body);
	Dashboard.findByIdAndUpdate(req.params.id, {
		$set : req.body
	}, function(err, doc) {
		if (err)
			return console.log(err);
		else
			res.send(200);
	});

};
 
 