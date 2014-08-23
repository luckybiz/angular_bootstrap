var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , config = require('./config/config')
  , path = require('path')
  , partials = require('express-partials')
  , passport = require('passport')
  , flashify = require('flashify')
  , gzippo = require('gzippo')
  , moment = require('moment');
  


// Load configurations
console.log("[INFO] Reading configurations");
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env];  


//Init Database connection
console.log("[INFO] Initializing database connection");
//var mongoose = require('mongoose');
//mongoose.connect(config.db);
console.log("[INFO] Connected to: %s",config.db);



//Bootstrap model schemas
console.log("[INFO] Initializing model schemas");
var schemasPath = __dirname + '/schemas'
  , schemaFiles = fs.readdirSync(schemasPath);

schemaFiles.forEach(function (file) {
  require(schemasPath+'/'+file);
  console.log("[INFO] Model schema initialized: %s", file);
});

//Initializing ExpressJS
console.log("[INFO] Initializing express");
var app = express();
app.configure(function () {
    app.set('port', process.env.PORT || config.port || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.logger('dev'));
    app.use(partials());
    app.use(express.bodyParser());
    app.use(express.cookieParser('suppper secret'));
    app.use(express.session());
    app.use(passport.initialize());
    app.use(passport.session());
    // app.use(isadmin)
    app.use(express.favicon(__dirname + '/public/favicon.ico'));
    app.use(express.methodOverride());
    app.use(flashify);
    
    app.use(app.router);
    app.use(gzippo.staticGzip(path.join(__dirname, 'public'), { maxAge: config.staticMaxAge }));
    app.use(gzippo.compress());
});


app.configure('development', function(){
  app.use(express.errorHandler());
});


app.locals = {moment: moment};

//Bootstrap rest routes
var routesPath = __dirname + '/routes'
  , routesFiles = fs.readdirSync(routesPath);

routesFiles.forEach(function (file) {
    var route = require(routesPath + '/' + file);
    route.boot(app);
    console.log("[INFO] Route initialized: %s", file);
});


//Init api Server
console.log("[INFO] Initializing express: /api/v1.0 server");
var apiServer = require('./api/v1.0/server');
app.use('/api/v1.0', apiServer);


//Starting server
var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("[INFO] Express server listening on port " + app.get('port'));
});
