var path = require('path');
var express = require('express');
var Gpio = require('pigpio').Gpio;

var app = express();

app.use(express.static(path.join(__dirname, 'src/client/public')));

var ledsOnOff = {
  "red": false,
  "blue": false
};
function toggle(color, ledGpio) {
  // var currentDutyCycle = red.getPwmDutyCycle();
  if (ledsOnOff[color]) {
    ledGpio.pwmWrite(0);
    console.log('Color:' + color + ' pwm: 0');
    ledsOnOff[color] = false;
    return {"colorOn": false};
  } else {
    ledGpio.pwmWrite(200);
    console.log('Color:' + color + ' pwm: 200');
    ledsOnOff[color] = true;
    return {"colorOn": true};
  }
}

app.get('/toggleRed', function(req, res) {
  var PIN_RED = 17;
  var ledGpio = new Gpio(PIN_RED, {mode: Gpio.OUTPUT});

  var response = toggle('red', ledGpio);
  res.header('Access-Control-Allow-Origin', '*');
  res.send(response);

  console.log('Red colorOn: ' + ledsOnOff.red);
});

app.get('/toggleBlue', function(req, res) {
  var PIN_BLUE = 27;
  var ledGpio = new Gpio(PIN_BLUE, {mode: Gpio.OUTPUT});

  var response = toggle('blue', ledGpio);
  res.header('Access-Control-Allow-Origin', '*');
  res.send(response);

  console.log('Blue colorOn: ' + ledsOnOff.blue);
});

app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'src/client/public/index.html'));
});

var server = app.listen(8080, function () {
  console.log('Node Express Webserver Started');
});