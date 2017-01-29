import http_mocks from 'node-mocks-http'
import {expect} from 'chai'

import allRoute from '../../../../../src/server/app/routes/connected-gpios/all'

describe('all connected-gpio route', () => {

    let request = http_mocks.createRequest()
    let response = http_mocks.createResponse()

    it('should return connections json', () => {
        allRoute(request, response)

        expect(response.statusCode).equal(200)
        expect(response._isJSON()).equal(true)

        let responseJson = JSON.parse(response._getData())
        expect(responseJson.gpios.length).equal(3)

        expect(responseJson.gpios.filter((gpio) => {
            return gpio.gpioPin == 17
        }).length).equal(1, 'number of pin 17')

        expect(responseJson.gpios.filter((gpio) => {
            return gpio.gpioPin == 18
        }).length).equal(1, 'number of pin 18')

        expect(responseJson.gpios.filter((gpio) => {
            return gpio.gpioPin == 27
        }).length).equal(1, 'number of pin 27')

    })
})

