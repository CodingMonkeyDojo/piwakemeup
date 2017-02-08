export default class MockGpio {

    static OUTPUT

    constructor() {
        this.dutyCycle = 0
    }

    getPwmDutyCycle() {
        return this.dutyCycle
    }

    pwmWrite(dutyCycle) {
        this.dutyCycle = dutyCycle
    }

}
