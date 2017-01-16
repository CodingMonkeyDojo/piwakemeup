import {Gpio} from 'pigpio'

export default class GpioLed {
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

  setDutyCycle(dutyCycle) {
    this.gpio.pwmWrite(dutyCycle)
  }

  getDutyCycle() {
    return this.gpio.getPwmDutyCycle()
  }

}
