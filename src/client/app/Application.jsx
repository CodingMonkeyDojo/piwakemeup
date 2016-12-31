import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import 'whatwg-fetch'

import AppBar from 'material-ui/AppBar'
import ColorToggleGroup from './components/ColorToggleGroup.jsx'

export default class Application extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let endpoint = 'http://raspberrypi.local:8080'
    // let endpoint = 'http://localhost:8080'

    return (
      <MuiThemeProvider>
        <div style={{'text-align': 'center'}}>
          <AppBar title="LIGHTER"  />
          <div style={{display: 'inline-block', 'padding': '30px'}}>
            <ColorToggleGroup endpoint={endpoint}/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
