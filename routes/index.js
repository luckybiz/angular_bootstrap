var mongoose = require('mongoose')
  , Connection = mongoose.model('Connection')
  , Graph = mongoose.model('Graph')
  , Dashboard = mongoose.model('Dashboard')
  , Layout = mongoose.model('Layout');

exports.boot = function (app, auth) {

    app.get('/', function (req, res) {
            res.render('index');
    });

}