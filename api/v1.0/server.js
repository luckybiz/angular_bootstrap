var express = require('express')
  , app = module.exports = express()
  , path = require('path')
  , fs = require('fs');
  

app.use(express.bodyParser());
//Routes
console.log("[INFO] Initializing express: API v1.0 routes");
require('./route_handler').init(app);