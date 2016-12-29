import React from 'react'
import Fetch from 'isomorphic-fetch'

export default class ColorToggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redOn: false
    }
    this.toggleLight = this.toggleLight.bind(this)
  }

  render() {
    return (
      <button onClick={this.toggleLight}>Red</button>
    )
  }

  toggleLight() {
    Fetch('http://raspberrypi.local:8080/toggleRed', {
      mode: 'no-cors'
    })
      .then((data) => {
        console.log(data)
        if (data.redOn) {
          this.setState({
            redOn: true
          })
        } else {
          this.setState({
            redOn: false
          })
        }
      })
    // Fetch.fetchUrl('http://raspberrypi.local:8080/toggleRed', (error, meta, body) => {
    //   if (body.redOn) {
    //     this.setState({
    //       redOn: true
    //     })
    //   } else {
    //     this.setState({
    //       redOn: false
    //     })
    //   }
    // })
  }

}