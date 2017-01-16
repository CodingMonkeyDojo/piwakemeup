import React from 'react'
import ColorToggleButton from './ColorToggle.jsx'

export default class ColorToggleGroup extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var buttons = this.props.statuses.map( led => {
      return (
        <div style={{'padding': '10px'}}>
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
  statuses: React.PropTypes.object.isRequired,
  onStatusUpdate: React.PropTypes.object.isRequired
}