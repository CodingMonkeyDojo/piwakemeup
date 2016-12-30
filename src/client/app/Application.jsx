import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ColorToggleButton from './components/ColorToggle.jsx'

let Application  = props => {
  return (
    <MuiThemeProvider>
      <div>
        <h1>Test Driven Development!!</h1>
        <div>
          <ColorToggleButton colorLabel={'Red'}/>
        </div>
        <div>
          <ColorToggleButton colorLabel={'Green'}/>
        </div>
        <div>
          <ColorToggleButton colorLabel={'Blue'}/>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

export default Application