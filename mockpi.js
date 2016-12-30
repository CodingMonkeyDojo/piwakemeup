var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var ledsOnOff = {
  "red": {
    "status": false,
    "pin": 17
  },
  "green": {
    "status": false,
    "pin": 18
  },
  "blue": {
    "status": false,
    "pin": 27
  }
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/toggle', function(req, res) {
  var led = ledsOnOff[req.body.color];
  led.status = !led.status;
  res.send({"colorOn": led.status});
});

app.listen(8080, function () {
  console.log('Mock Node Express Webserver Started');
});