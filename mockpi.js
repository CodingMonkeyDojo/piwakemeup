var express = require('express');

var app = express();

var redOn = false;
var blueOn = false;
app.get('/toggleRed', function (req, res) {
  redOn = !redOn;
  res.header('Access-Control-Allow-Origin', '*');
  res.send({"colorOn": redOn});
});

app.get('/toggleBlue', function (req, res) {
  blueOn = !blueOn;
  res.header('Access-Control-Allow-Origin', '*');
  res.send({"colorOn": blueOn});
});

app.listen(8080, function () {
  console.log('Mock Node Express Webserver Started');
});