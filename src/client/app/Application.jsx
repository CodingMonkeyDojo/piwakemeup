import React from 'react'
import ColorToggleButton from './components/ColorToggle.jsx'

export default class Application extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Wake up before you go go!!</h1>
        <div>
          <ColorToggleButton/>
        </div>
      </div>
    )
  }
}