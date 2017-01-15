import React from 'react'
import ColorToggleButton from './ColorToggle.jsx'
import EndPointService from '../EndPointService'

export default class ColorToggleGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      statuses: []
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount() {
    let endpoint = `${this.props.endpoint}/statuses`

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

  handleToggle(newStatus) {
    const newStatuses = this.state.statuses.map(status => {
      return (status.color === newStatus.color) ? newStatus : status
    });
    this.setState(newStatuses)
  }

  render() {
    var buttons = this.state.statuses.map( led => {
      return (
        <div style={{'padding': '10px'}}>
          <ColorToggleButton
            key={led.color}
            colorLabel={led.color}
            status={led}
            endPointService={new EndPointService(this.props.endpoint)}
            onToggle={this.handleToggle}
          />
        </div>
        )
      } )
    return (
      <div style={{display: 'inline'}}>
        {buttons}
      </div>
    )
  }
}

ColorToggleGroup.propTypes = {
  endpoint: React.PropTypes.string.isRequired
}