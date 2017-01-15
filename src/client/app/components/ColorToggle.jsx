import React from 'react'
import 'whatwg-fetch'
import {Toggle} from 'material-ui'

export default class ColorToggle extends React.Component {

  constructor(props) {
    super(props)
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle() {
    this.props.onToggle(this.props.colorLabel)
  }

  render() {
    const styles = {
      block: {
        maxWidth: 250,
      },
      toggle: {
        marginBottom: 16,
      },
      // thumbOff: {
      //   backgroundColor: '#ffcccc',
      // },
      // trackOff: {
      //   backgroundColor: '#ff9d9d',
      // },
      // thumbSwitched: {
      //   backgroundColor: this.props.colorLabel.toLowerCase()
      // },
      // trackSwitched: {
      //   backgroundColor: '#ff9d9d',
      // },
      labelStyle: {
        color: this.props.colorLabel.toLowerCase(),
        fontSize: '5.0em'
      },
    }

    return (
      <div style={{display: 'inline-block', height: '150px'}}>
        <Toggle
          defaultToggled={this.props.initialStatus}
          label={this.props.colorLabel}
          thumbStyle={styles.thumbOff}
          trackStyle={styles.trackOff}
          thumbSwitchedStyle={styles.thumbSwitched}
          trackSwitchedStyle={styles.trackSwitched}
          labelStyle={styles.labelStyle}
          onToggle={this.onToggle} />
      </div>
    )
  }

}

ColorToggle.propTypes = {
  colorLabel: React.PropTypes.string.isRequired,
  initialStatus: React.PropTypes.bool.isRequired,
  onToggle: React.PropTypes.any
}