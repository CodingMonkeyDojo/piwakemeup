import React from 'react'
import ColorToggleButton from './ColorToggle.jsx'

export default class ColorToggleGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      statuses: []
    }
  }
  componentDidMount() {
    let endpoint = 'http://raspberrypi.local:8080/statuses'
    // let endpoint = `http://localhost:8080/statuses`

    fetch(endpoint)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(`Problem getting statuses from ${endpoint}`)
      })
      .then(data => {
        this.setState({statuses: data})
      })
  }


  render() {
    var buttons = this.state.statuses.map( led => {
      return (
          <ColorToggleButton key={led.color} colorLabel={led.color} initialLedStatus={led.status} />
        )
      } )
    return (
      <div>
        {buttons}
      </div>
    )
  }
}