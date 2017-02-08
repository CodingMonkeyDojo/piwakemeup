import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'

import 'jsdom-global/register'

import LedApplication from '../../../src/client/app/LedApplication.jsx'
import EndpointService from '../../../src/client/app/EndpointService'

describe('<LedApplication />', () => {
  const INITIAL_STATUSES =
    [
      { color: 'red', status: false},
      { color: 'green', status: false},
      { color: 'blue', status: false}
    ]

  const endpointService = new EndpointService()

  let endPointServiceMock = null

  beforeEach(() => {
    endPointServiceMock = sinon.mock(endpointService)
  })

  afterEach(() => {
    endPointServiceMock.restore()
  })

  it('should load initial led statuses when mount', () => {
    endPointServiceMock
      .expects('get')
      .withArgs('/statuses')
      .returns(
        {
          then(resolve) {
            resolve([])
          }
        }
      )
      .exactly(1)

    mount(<LedApplication endpointService={endpointService} />)

    endPointServiceMock.verify()

  })

  it('toggle should post and update statuses from server values', ()=>{
    let endpointServiceStub = sinon.stub(endpointService, 'get', () => {
      return {
        then(resolved) {
          resolved(INITIAL_STATUSES)
        }
      }
    })

    endPointServiceMock
      .expects('post')
      .withArgs( '/toggle', { color: 'red' } )
      .returns({ then(resolved) {
        resolved({ color: 'red', status: true })
      }})
      .once()

    let ledApplication = shallow(
      <LedApplication
        endpointService={endpointService}
      />).instance()

    ledApplication.initializeStatuses()

    ledApplication.toggleLight('red')

    expect(ledApplication.state.statuses).to.deep.equal(
      [
        { "color": "red", "status": true},
        { "color": "green", "status": false},
        { "color": "blue", "status": false}
      ]
    )

    endPointServiceMock.verify()
    endpointServiceStub.restore()
  })

  it('updates status for a specific color', () => {
    let endpointServiceStub = sinon.stub(endpointService, 'get', () => {
      return {
        then(resolved) {
          resolved([{"color": "summer", "status": true}])
        }
      }
    })

    let ledApplication = shallow(<LedApplication endpointService={endpointService}/>).instance()

    ledApplication.initializeStatuses()

    expect(ledApplication.state.statuses).to.be.eqls([{"color": "summer", "status": true}])

    ledApplication.updateStatuses({"color": "summer", "status": false})

    expect(ledApplication.state.statuses).to.be.eqls([{"color": "summer", "status": false}])

    endpointServiceStub.restore()
  })
})