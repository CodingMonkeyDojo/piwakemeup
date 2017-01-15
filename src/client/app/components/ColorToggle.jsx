import React from 'react'
import 'whatwg-fetch'
import {Toggle} from 'material-ui'

export default class ColorToggle extends React.Component {

  constructor(props) {
    super(props)
    this.toggleLight = this.toggleLight.bind(this)
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
          onToggle={this.toggleLight} />
      </div>
    )
  }

  toggleLight() {
    this.props.endPointService
      .post( '/toggle', { color: this.props.colorLabel } )
      .then((data) => {
        this.props.onToggle(data)
      })
  }

}

ColorToggle.propTypes = {
  colorLabel: React.PropTypes.string.isRequired,
  initialStatus: React.PropTypes.bool.isRequired,
  endPointService: React.PropTypes.object.isRequired,
  onToggle: React.PropTypes.any
}