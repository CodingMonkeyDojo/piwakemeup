import request from 'supertest'

describe('Server /connections', () => {

    let url = 'http://localhost:8080'

    describe('GET /connections', () => {

        it('responds success', (done) => {
            request(url)
                .get('/connections')
                .expect(200, done)
        })

        it('content type should be json', (done) => {
            request(url)
                .get('/connections')
                .expect('Content-Type', /json/, done)
        })

        it('should return connections json', (done) => {
            request(url)
                .get('/connections')
                .expect(200, {
                    connections: [
                        {id: 1},
                        {id: 2}
                    ]
                }, done)
        })

    })

})
