import React from 'react'
import {render} from 'react-dom'
import LedApplication from './LedApplication.jsx'
import EndpointService from './EndPointService'

const ENDPOINT = 'http://raspberrypi.local:8080'
// let ENDPOINT = 'http://localhost:8080'

render(<LedApplication endpointService={new EndpointService(ENDPOINT)} />, document.getElementById('app'))