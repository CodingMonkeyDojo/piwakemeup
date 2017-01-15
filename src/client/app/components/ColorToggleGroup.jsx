import React from 'react'
import ColorToggleButton from './ColorToggle.jsx'

export default class ColorToggleGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      statuses: []
    }
    this.updateStatuses = this.updateStatuses.bind(this)
    this.toggleLight = this.toggleLight.bind(this)
    this.initializeStatuses = this.initializeStatuses.bind(this)
  }

  componentDidMount() {
    this.initializeStatuses();
  }

  initializeStatuses() {
    this.props.endPointService.get('/statuses')
      .then(data => {
        this.setState({statuses: data})
      })
  }

  toggleLight(color) {
    this.props.endPointService
      .post( '/toggle', { color: color } )
      .then((data) => {
        this.updateStatuses(data)
      })
  }

  updateStatuses(newStatus) {
    const newStatuses = this.state.statuses.map(status => {
      return (status.color === newStatus.color) ? newStatus : status
    });
    this.setState({statuses: newStatuses})
  }

  render() {
    var buttons = this.state.statuses.map( led => {
      return (
        <div style={{'padding': '10px'}}>
          <ColorToggleButton
            key={led.color}
            colorLabel={led.color}
            initialStatus={led.status}
            onToggle={this.toggleLight}
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
  endPointService: React.PropTypes.object.isRequired
}