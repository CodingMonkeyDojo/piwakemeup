import React from 'react'
import ColorSlider from './ColorSlider.jsx'

let ColorSliderGroup = ({statuses, onStatusUpdate}) => {
    let sliders = statuses.map( led => {
      return (
        <div style={{'padding': '10px', 'width': '80%', 'margin': '0 auto'}} key={led.color}>
          <ColorSlider
            key={led.color}
            color={led.color}
            powerLevel={led.powerLevel}
            onChange={onStatusUpdate}
          />
        </div>
        )
      } )
    return (
      <div style={{display: 'inline'}}>
        {sliders}
      </div>
    )
}

ColorSliderGroup.propTypes = {
  statuses: React.PropTypes.array.isRequired,
  onStatusUpdate: React.PropTypes.func.isRequired
}

export default ColorSliderGroup