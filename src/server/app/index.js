import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

import {Gpio} from 'pigpio'

let app = express()

app.use(express.static(path.join(__dirname, 'src/client/public')))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

class GpioLed {
  constructor(pinNumber) {
    this.gpio = new Gpio(pinNumber, {mode: Gpio.OUTPUT})
  }

  isLedOn() {
    return this.gpio.getPwmDutyCycle() === 0
  }

  toggle() {
    this.isLedOn() ? this.switchOff() : this.switchOn()
  }

  switchOn() {
    this.gpio.pwmWrite(0)
  }

  switchOff() {
    this.gpio.pwmWrite(255)
  }
}

const colorLedGpios = {
  "red": new GpioLed(17),
  "green": new GpioLed(18),
  "blue": new GpioLed(27)
}

app.get('/statuses', function(req, res) {
  let statuses = Object.keys(colorLedGpios).map((key, index) => {
    return {
      "color": key,
      "status": (colorLedGpios[key].isLedOn())
    }
  })
  res.send(statuses)
})

app.post('/toggle', function(req, res) {
  console.log('Toggling Color', req.body.color)
  let led = colorLedGpios[req.body.color]
  led.toggle()
  res.send({"colorOn": (led.isLedOn())})
})

app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'src/client/public/index.html'))
})

const PORT = 8080;
app.listen(PORT, function () {
  console.log(`Node Express Webserver Started on port ${PORT}`)
  initializeLeds();
})

function initializeLeds() {
  Object.keys(colorLedGpios).map((color) => {
    console.log('turning off led', color)
    colorLedGpios[color].switchOff()
  })
}
