import React from 'react'
import 'whatwg-fetch'
import {Toggle} from 'material-ui'

export default class ColorToggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.status
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
        color: this.props.colorLabel.toLowerCase()
      },
    }

    return (
      <div style={{display: 'inline-block'}}>
        <Toggle
          defaultToggled={this.props.status.status}
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
    fetch(`${this.props.endpoint}/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        color: this.props.colorLabel
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Error in response')
      })
      .then((data) => {
        this.props.onToggle(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

}

ColorToggle.propTypes = {
  colorLabel: React.PropTypes.string.isRequired,
  status: React.PropTypes.object.isRequired,
  endpoint: React.PropTypes.string.isRequired,
  onToggle: React.PropTypes.any
}