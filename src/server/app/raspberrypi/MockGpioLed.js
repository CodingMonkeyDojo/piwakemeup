export default class MockGpioLed {
  constructor(pinNumber) {
    this.gpio = {
      "pwmDutyCycle": 255
    }
  }

  isLedOn() {
    return this.gpio.pwmDutyCycle === 0
  }

  toggle() {
    this.isLedOn() ? this.switchOff() : this.switchOn()
  }

  switchOn() {
    this.gpio.pwmDutyCycle = 0
  }

  switchOff() {
    this.gpio.pwmDutyCycle = 255
  }

  setDutyCycle(dutyCycle) {
    this.gpio.pwmDutyCycle = dutyCycle
  }

  getDutyCycle() {
    return this.gpio.pwmDutyCycle
  }
}
