import React from 'react'
import ColorToggleButton from './ColorToggle.jsx'

export default class ColorToggleGroup extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let buttons = this.props.statuses.map( led => {
      return (
        <div style={{'padding': '10px'}} key={led.color}>
          <ColorToggleButton
            key={led.color}
            colorLabel={led.color}
            initialStatus={led.status}
            onToggle={this.props.onStatusUpdate}
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
  statuses: React.PropTypes.array.isRequired,
  onStatusUpdate: React.PropTypes.func.isRequired
}