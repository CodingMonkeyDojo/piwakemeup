import {expect} from 'chai'
import Gpio from '../raspberrypi/MockGpio'
import GpioService from '../../../../src/server/app/services/GpioService'

describe('GpioService', () => {

/*
    it('returns status for a particular pin', () => {

        let gpioService = new GpioService(Gpio)

        let pinStatus = gpioService.getStatus(17)

        expect(pinStatus.dutyCycle).to.be.a('number')

    })
*/

    it('sets dutyCycle for a particular pin', () => {

        let gpioService = new GpioService(Gpio)

        gpioService.setDutyCycle(17, 100)

        expect(gpioService.getStatus(17).dutyCycle).to.equal(100)

        gpioService.setDutyCycle(17, 200)

        expect(gpioService.getStatus(17).dutyCycle).to.equal(200)
    })

})