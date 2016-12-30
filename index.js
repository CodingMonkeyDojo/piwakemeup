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
function toggle(color) {
  // var currentDutyCycle = red.getPwmDutyCycle();
  let led = ledsOnOff[color.toLowerCase()];
  let ledGpio = new Gpio(led.pin, {mode: Gpio.OUTPUT});
  if (led.status) {
    ledGpio.pwmWrite(0);
    console.log('Color:' + color + ' pwm: 0');
    led.status = false;
    return {"colorOn": led.status};
  } else {
    ledGpio.pwmWrite(200);
    console.log('Color:' + color + ' pwm: 200');
    led.status = true;
    return {"colorOn": led.status};
  }
}

app.post('/toggle', function(req, res) {
  toggle(req.body.color)
  ledsOnOff[req.body.color] = !ledsOnOff[req.body.color];
  res.send({"colorOn": ledsOnOff[req.body.color]});
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
});