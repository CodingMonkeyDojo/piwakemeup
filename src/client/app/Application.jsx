import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import 'whatwg-fetch'

import ColorToggleGroup from './components/ColorToggleGroup.jsx'

export default class Application extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    // let endpoint = 'http://raspberrypi.local:8080'
    let endpoint = 'http://localhost:8080'

    return (
      <MuiThemeProvider>
        <div>
          <h1>Test Driven Development!!</h1>
          <ColorToggleGroup endpoint={endpoint}/>
        </div>
      </MuiThemeProvider>
    )
  }
}
