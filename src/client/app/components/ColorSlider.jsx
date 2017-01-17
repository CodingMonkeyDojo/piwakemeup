import React from 'react'
import Slider from 'material-ui/Slider'

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
      <Slider
        min={0}
        max={255}
        defaultValue={this.brightness}
        value={this.brightness}
        onChange={this.valueChanged} />
    )
  }

  valueChanged(event, newNumber) {
    this.props.onChange(this.props.color, 255 - newNumber)
  }
}

ColorSlider.PropTypes = {
  color: React.PropTypes.string.isRequired,
  powerLevel: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
}