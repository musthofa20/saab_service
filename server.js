// LIB
var port = process.env.PORT || 1022;
var express = require('express')
var bodyparser = require('body-parser');
var nodeFetch = require('node-fetch')
const fetch = require('fetch-cookie')(nodeFetch);
var routes = require('./routes');
const app = express();
var https = require('https')
var fs = require('fs')
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';
var morgan = require('morgan')

// ROUTES
app.use(morgan('combined'))
app.use(bodyparser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next()
})
routes(app);


app.listen(port);

console.log('Service started on: ' + port);