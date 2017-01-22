import React from 'react'
import 'whatwg-fetch'

import SingleColorControlGroup from './components/SingleColorControlGroup.jsx'

import EndpointService from './EndpointService'

const ENDPOINT = 'http://raspberrypi.local:8080'
// let ENDPOINT = 'http://localhost:8080'

export default class LedApplication extends React.Component {
  static get defaultProps() {
    return {
      endpointService: new EndpointService(ENDPOINT)
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      statuses: []
    }
    this.updateStatuses = this.updateStatuses.bind(this)
    this.initializeStatuses = this.initializeStatuses.bind(this)
    this.toggleLight = this.toggleLight.bind(this)
    this.changePowerLevel = this.changePowerLevel.bind(this)
  }

  componentDidMount() {
    this.initializeStatuses();
  }


  initializeStatuses() {
    this.props.endpointService.get('/statuses')
      .then(data => {
        this.setState({statuses: data})
      })
  }

  updateStatuses(newStatus) {
    const newStatuses = this.state.statuses.map(status => {
      return (status.color === newStatus.color) ? newStatus : status
    });
    this.setState({statuses: newStatuses})
  }

  toggleLight(color) {
    this.props.endpointService
      .post( '/toggle', { color: color } )
      .then((data) => {
        this.updateStatuses(data)
      })
  }

  changePowerLevel(color, newPowerLevel) {
    this.props.endpointService
      .post( '/powerLevel', { color: color, powerLevel: Math.floor(newPowerLevel) } )
      .then((data) => {
        this.updateStatuses(data)
      })
  }


  render() {
    let controlGroups = this.state.statuses.map(led => {
        return (
            <div style={{textAlign: 'center'}} key={led.color}>
              <div style={{verticalAlign: 'middle', display: 'inline-block'}}>
                <SingleColorControlGroup
                    color={led.color}
                    toggleStatus={led.status}
                    powerLevel={led.powerLevel}
                    onToggle={this.toggleLight}
                    onSlide={this.changePowerLevel}/>
              </div>
            </div>
        )
    })
      return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{position: 'absolute', top:'50%', transform:'translateY(-50%)'}}>
            {controlGroups}
          </div>
        </div>
    )
  }
}

LedApplication.PropTypes = {
  endpointService: React.PropTypes.object
}
