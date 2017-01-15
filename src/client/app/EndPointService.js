import 'whatwg-fetch'

export default class EndPointService {
  constructor(host) {
    this.host = host
  }

  post(resource, data) {
    return fetch(`${this.host}${resource}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Error in response')
      })
      .catch((error) => {
        console.log(error)
      })

  }

}
