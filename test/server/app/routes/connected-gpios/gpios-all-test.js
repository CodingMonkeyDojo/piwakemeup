import request from 'supertest'

describe('Server /connected-gpios', () => {

    let url = 'http://localhost:8080'

    describe('GET /connected-gpios', () => {

        it('responds success', (done) => {
            request(url)
                .get('/connected-gpios')
                .expect(200, done)
        })

        it('content type should be json', (done) => {
            request(url)
                .get('/connected-gpios')
                .expect('Content-Type', /json/, done)
        })

        it('should return connections json', (done) => {
            request(url)
                .get('/connected-gpios')
                .expect(200, {
                    gpios: [
                        {gpioPin: 17, modulePin: 'red'},
                        {gpioPin: 18, modulePin: 'green'},
                        {gpioPin: 27, modulePin: 'blue'}
                    ]
                }, done)
        })

    })

})
