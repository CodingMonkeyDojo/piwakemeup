import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import 'whatwg-fetch'

import AppBar from 'material-ui/AppBar'
import ColorToggleGroup from './components/ColorToggleGroup.jsx'
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


  render() {
    return (
      <MuiThemeProvider>
        <div style={{'textAlign': 'center'}}>
          <AppBar title="LIGHTER"  />
          <div style={{display: 'inline-block', 'padding': '30px'}}>
            <ColorToggleGroup
              statuses={this.state.statuses}
              onStatusUpdate={this.toggleLight}
            />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

LedApplication.PropTypes = {
  endpointService: React.PropTypes.object
}
