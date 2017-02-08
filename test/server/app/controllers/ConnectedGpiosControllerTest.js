import http_mocks from 'node-mocks-http'
import {expect} from 'chai'

import ConnectedGpiosController from '../../../../src/server/app/controllers/ConnectedGpiosController'

describe('Controllers: ConnectedGpiosController', () => {

    let response = null;

    beforeEach(() => {
        response = http_mocks.createResponse()
    })

    describe('listing \'all\'', () => {
        it('should return successfully a json', () => {
            let controller = new ConnectedGpiosController(
                { getStatus(pin) { } },
                {
                    "connectedGpios": [
                        { "gpioPin": 17, "modulePin": "red", "color": "red" }
                    ]
                })

            controller.all(response)

            expect(response.statusCode).equal(200)
            expect(response._isJSON()).equal(true)
        })

        it('all have the right number of connected pins', () => {
            let controller = new ConnectedGpiosController(
                { getStatus(pin) { } },
                {
                "connectedGpios": [
                    { "gpioPin": 17, "modulePin": "red", "color": "red" },
                    { "gpioPin": 18, "modulePin": "green", "color": "green" },
                    { "gpioPin": 27, "modulePin": "blue", "color": "blue" }
                ]
            })

            controller.all(response)

            let responseJson = JSON.parse(response._getData())
            expect(responseJson.gpios.length).equal(3)
        })

        it('getting the right pin information', () => {
            let controller = new ConnectedGpiosController(
                { getStatus(pin) { } },
                {
                "connectedGpios": [
                    { "gpioPin": 18, "modulePin": "green", "color": "green" },
                ]
            })

            controller.all(response)

            let responseJson = JSON.parse(response._getData())

            expect(responseJson.gpios[0].gpioPin).equal(18)
        })

        it('gets status from GpioService', () => {
            let controller =
                new ConnectedGpiosController(
                    {
                        getStatus(pin) {
                            return {"dutyCycle": 245}
                        }
                    },
                    { "connectedGpios": [ { "gpioPin": 18, "modulePin": "green", "color": "green" } ] }
                    )

            controller.all(response)

            let responseJson = JSON.parse(response._getData())

            expect(responseJson.gpios[0].dutyCycle).equal(245)
        })
    })
})