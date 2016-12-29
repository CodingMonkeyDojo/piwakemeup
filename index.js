var path = require('path');
var express = require('express');
var Gpio = require('pigpio').Gpio;

var app = express();

app.use(express.static(path.join(__dirname, 'src/client/public')));

var redOn = false
app.get('/toggleRed', function(req, res) {
  var PIN_RED = 17;
  var red = new Gpio(PIN_RED, {mode: Gpio.OUTPUT});
  function toggleRed() {
    // var currentDutyCycle = red.getPwmDutyCycle();
    if (redOn) {
      red.pwmWrite(0);
      redOn = false;
      return {"redOn": false};
    } else {
      red.pwmWrite(200);
      redOn = true;
      return {"redOn": true};
    }
  }

  res.send(toggleRed());
});

app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'src/client/public/index.html'));
});

var server = app.listen(8080, function () {
  console.log('Node Express Webserver Started');
});