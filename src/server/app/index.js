import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

import {Gpio} from 'pigpio'

let app = express();

app.use(express.static(path.join(__dirname, 'src/client/public')));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const ledsOnOff = {
  "red": {
    "pin": 17,
    "gpio": createGpio(17)
  },
  "green": {
    "pin": 18,
    "gpio": createGpio(18)
  },
  "blue": {
    "pin": 27,
    "gpio": createGpio(27)
  }
};

function toggle(color) {
  let led = ledsOnOff[color.toLowerCase()];
  let wasOn = led.gpio.getPwmDutyCycle() == 0;

  led.gpio.pwmWrite(wasOn ? 255 : 0);

  return {"colorOn": (ledsOnOff[color.toLowerCase()].gpio.getPwmDutyCycle() == 0)};
}

app.post('/toggle', function(req, res) {
  toggle(req.body.color)
  console.log('Toggling Color', req.body.color);
  let led = ledsOnOff[req.body.color];
  res.send({"colorOn": (led.gpio.getPwmDutyCycle() == 0)});
});

app.get('/statuses', function(req, res) {
  let statuses = Object.keys(ledsOnOff).map((key, index) => {
    return {
      "color": key,
      "status": (ledsOnOff[key].gpio.getPwmDutyCycle() == 0)
    }
  })
  res.send(statuses)
});

app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'src/client/public/index.html'));
});

app.listen(8080, function () {
  console.log('Node Express Webserver Started');
  initializeLeds();
});

function initializeLeds() {
  Object.keys(ledsOnOff).map((color) => {
    console.log('turnning off led', color);
    ledsOnOff[color].gpio.pwmWrite(255);
  })
}

function createGpio(pin) {
  console.log('creating gpio for pin', pin);
  return new Gpio(pin, {mode: Gpio.OUTPUT});
}

[1,2,3].map(item => {
  return item * item
})