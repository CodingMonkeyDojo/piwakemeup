import React from 'react'
import ColorToggleButton from './ColorToggle.jsx'

let ColorToggleGroup = ({statuses, onStatusUpdate}) => {
    let buttons = statuses.map( led => {
      return (
        <div style={{'padding': '10px'}} key={led.color}>
          <ColorToggleButton
            key={led.color}
            colorLabel={led.color}
            initialStatus={led.status}
            onToggle={onStatusUpdate}
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

ColorToggleGroup.propTypes = {
  statuses: React.PropTypes.array.isRequired,
  onStatusUpdate: React.PropTypes.func.isRequired
}

export default ColorToggleGroup