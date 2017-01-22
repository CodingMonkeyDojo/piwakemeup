import path from 'path'
import util from 'util'
import express from 'express'
import expressValidator from 'express-validator'
import bodyParser from 'body-parser'
import modules from './routes/modules'

export default class Server {
  constructor(GpioLed) {
    this.GpioLed = GpioLed
  }

  run() {
    const colorLedGpios = {
      "red": new this.GpioLed(17),
      "green": new this.GpioLed(18),
      "blue": new this.GpioLed(27)
    }

    let app = express()
    app.use(express.static(path.resolve(__dirname) + '/../../client/public'))
    app.use(bodyParser.json())
    app.use(expressValidator({
      customValidators: {
        lte(param, num) {
          return param <= num
        },
        gte(param, num) {
          return param >= num
        }
      }
    }))
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*")
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      next()
    })

      app.use('/modules', modules)

    app.get('/statuses', function(req, res) {
      let statuses = Object.keys(colorLedGpios).map((key, index) => {
        return {
          "color": key,
          "status": (colorLedGpios[key].isLedOn()),
          "powerLevel": colorLedGpios[key].getDutyCycle()
        }
      })
      res.send(statuses)
    })

    app.post('/toggle', function(req, res) {
      console.log('Toggling Color', req.body.color)
      let led = colorLedGpios[req.body.color]
      led.toggle()
      res.send({
        "color": req.body.color,
        "status": led.isLedOn(),
        "powerLevel": led.getDutyCycle()
      })
    })

    app.post('/powerLevel', function(req, res) {
      console.log('Setting power level for color:', req.body.color)
      console.log('Setting power level for powerLevel:', req.body.powerLevel)

      req.checkBody('color', 'Invalid color').notEmpty().isAlpha()
      req.checkBody('powerLevel', 'Invalid power level').notEmpty().isInt().gte(0).lte(255)

      req.sanitizeBody('powerLevel').toInt()

      req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
          res.send('There have been validation errors: ' + util.inspect(result.array()), 400)
          return
        }
        let led = colorLedGpios[req.body.color]
        led.setDutyCycle(req.body.powerLevel)
        res.send({
          "color": req.body.color,
          "status": led.isLedOn(),
          "powerLevel": led.getDutyCycle()
        })
      })
    })


    app.get('*', function response(req, res) {
      res.sendFile(path.resolve(__dirname + '/../../client/public/index.html'))
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
  }
}