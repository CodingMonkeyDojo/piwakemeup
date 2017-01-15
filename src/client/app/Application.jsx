import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import 'whatwg-fetch'

import AppBar from 'material-ui/AppBar'
import ColorToggleGroup from './components/ColorToggleGroup.jsx'
import EndPointService from './EndPointService'

const ENDPOINT = 'http://raspberrypi.local:8080'
// let ENDPOINT = 'http://localhost:8080'

export default class Application extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let endpointService = new EndPointService(ENDPOINT)

    return (
      <MuiThemeProvider>
        <div style={{'text-align': 'center'}}>
          <AppBar title="LIGHTER"  />
          <div style={{display: 'inline-block', 'padding': '30px'}}>
            <ColorToggleGroup endPointService={endpointService}/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
