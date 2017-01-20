import React from 'react'
import ReactBootstrapSlider from 'react-bootstrap-slider'

export default class ColorSlider extends React.Component {
  constructor(props) {
    super(props)
    this.valueChanged = this.valueChanged.bind(this)
  }

  get brightness() {
    return 255 - this.props.powerLevel
  }

  set brightness(newBrightnessLevel) {
    this.props.powerLevel = 255 - newBrightnessLevel
  }

  render() {
    return (
      <div style={{height: '50px'}}>
        <ReactBootstrapSlider
          value={this.brightness}
          change={this.valueChanged}
          min={0}
          max={255}
          orientation="horizontal" />
      </div>
    )
  }

  valueChanged(event) {
    this.props.onChange(this.props.color, 255 - event.target.value)
  }
}

ColorSlider.PropTypes = {
  color: React.PropTypes.string.isRequired,
  powerLevel: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
}