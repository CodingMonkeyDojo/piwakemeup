import 'whatwg-fetch'

export default class EndpointService {
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

  get(resource) {
    return fetch(`${this.host}${resource}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(`Problem getting statuses from ${this.host}${resource}`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

}
