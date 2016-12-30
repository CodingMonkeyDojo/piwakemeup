var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var Gpio = require('pigpio').Gpio;

var app = express();

app.use(express.static(path.join(__dirname, 'src/client/public')));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var ledsOnOff = {
  "red": {
    "status": false,
    "pin": 17,
    "gpio": createGpio(17)
  },
  "green": {
    "status": false,
    "pin": 18,
    "gpio": createGpio(18)
  },
  "blue": {
    "status": false,
    "pin": 27,
    "gpio": createGpio(27)
  }
};
function toggle(color) {
  // var currentDutyCycle = red.getPwmDutyCycle();
  console.log('toggling color', color);
  console.log('ledsOnOff', ledsOnOff);
  let led = ledsOnOff[color.toLowerCase()];
  console.log('led.status', led.status);
  console.log('led.pin', led.pin);
  let wasOn = led.gpio.getPwmDutyCycle() == 0;

  led.gpio.pwmWrite(wasOn ? 255 : 0);
  ledsOnOff[color.toLowerCase()].status = !wasOn;

  return {"colorOn": ledsOnOff[color.toLowerCase()].status};
}

app.post('/toggle', function(req, res) {
  toggle(req.body.color)
  console.log('Toggling Color', req.body.color);
  let led = ledsOnOff[req.body.color];
  led.status = !led.status;
  res.send({"colorOn": led.status});
});

app.get('/statuses', function(req, res) {
  var statuses = [];
  for(var color in ledsOnOff) {
    statuses.push({
      "color": color,
      "status": (ledsOnOff[color].gpio.getPwmDutyCycle() == 0)
    });
    console.log('/statuses', statuses);
  }
  res.send(statuses);
});
//
// app.get('/toggleRed', function(req, res) {
//   var PIN_RED = 17;
//   var ledGpio = new Gpio(PIN_RED, {mode: Gpio.OUTPUT});
//
//   var response = toggle('red', ledGpio);
//   res.header('Access-Control-Allow-Origin', '*');
//   res.send(response);
//
//   console.log('Red colorOn: ' + ledsOnOff.red);
// });
//
// app.get('/toggleBlue', function(req, res) {
//   var PIN_BLUE = 27;
//   var ledGpio = new Gpio(PIN_BLUE, {mode: Gpio.OUTPUT});
//
//   var response = toggle('blue', ledGpio);
//   res.header('Access-Control-Allow-Origin', '*');
//   res.send(response);
//
//   console.log('Blue colorOn: ' + ledsOnOff.blue);
// });

app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'src/client/public/index.html'));
});

var server = app.listen(8080, function () {
  console.log('Node Express Webserver Started');
  initializeLeds();
});

function initializeLeds() {
  for(var color in ledsOnOff) {
    console.log('turnning off led', color);
    ledsOnOff[color].gpio.pwmWrite(255);
  }
}

function createGpio(pin) {
  console.log('creating gpio for pin', pin);
  return new Gpio(pin, {mode: Gpio.OUTPUT});
}