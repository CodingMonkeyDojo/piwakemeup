export default class GpioService {

    constructor(GpioClass) {
        this.GpioClass = GpioClass
        this.gpios = {}
    }

    lookupGpio(pin) {
        if (!this.gpios[pin]) {
            this.gpios[pin] = new this.GpioClass(pin, {mode: this.GpioClass.OUTPUT})
        }
        return this.gpios[pin]
    }

    getStatus(pin) {
        let gpio = this.lookupGpio(pin)
        return {
            "dutyCycle": gpio.getPwmDutyCycle()
        }
    }

    setDutyCycle(pin, dutyCycle=0) {
        let gpio = this.lookupGpio(pin)
        gpio.pwmWrite(dutyCycle)
    }
}