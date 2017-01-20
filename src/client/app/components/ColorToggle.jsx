import React from 'react'
import 'whatwg-fetch'
import {Button} from 'react-bootstrap'

export default class ColorToggle extends React.Component {

  constructor(props) {
    super(props)
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle() {
    this.props.onToggle(this.props.colorLabel)
  }

  render() {
    const BS_STYLES = {
      red: 'danger',
      green: 'success',
      blue: 'primary'
    }
    const BUTTON_CONTAINER_STYLE = {width: '1000px', maxWidth: 400, margin: '0 auto 10px'}

    return (
      <div style={BUTTON_CONTAINER_STYLE}>
        <Button
          bsStyle={BS_STYLES[this.props.colorLabel]}
          bsSize="large"
          block={true}
          active={this.props.initialStatus}
          onClick={this.onToggle}>
          {this.props.colorLabel}
        </Button>
      </div>
    )
  }

}

ColorToggle.propTypes = {
  colorLabel: React.PropTypes.string.isRequired,
  initialStatus: React.PropTypes.bool.isRequired,
  onToggle: React.PropTypes.any
}