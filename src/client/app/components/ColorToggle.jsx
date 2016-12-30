import React from 'react'
import 'whatwg-fetch'
import {Toggle} from 'material-ui'

export default class ColorToggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colorOn: false
    }
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
    let endpoint = `http://raspberrypi.local:8080/toggle${this.props.colorLabel}`
    // let endpoint = `http://localhost:8080/toggle${this.props.colorLabel}`

    fetch(endpoint)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Error in response')
      })
      .then((data) => {
        if (data.colorOn) {
          this.setState({
            colorOn: true
          })
        } else {
          this.setState({
            colorOn: false
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

}

ColorToggle.propTypes = {
  colorLabel: React.PropTypes.string.isRequired
}