import {expect, assert} from 'chai'
import {shallow} from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import EndPointService from '../../../../src/client/app/EndPointService'

import ColorToggleGroup from '../../../../src/client/app/components/ColorToggleGroup.jsx'


describe('<ColorToggleGroup />', ()=>{

  const INITIAL_STATUSES =
    [
      { color: 'red', status: false},
      { color: 'green', status: false},
      { color: 'blue', status: false}
    ]

  const endPointService = new EndPointService()
  var endPointServiceStub = null
  var endPointServiceMock = null

  beforeEach(() => {
    endPointServiceStub = sinon.stub(endPointService, 'get', () => {
      return {
        then(resolved) {
          resolved(INITIAL_STATUSES)
        }
      }
    })

    endPointServiceMock = sinon.mock(endPointService)
  })

  afterEach(() => {
    endPointServiceStub.restore()
    endPointServiceMock.restore()
  })

  it('toggle should post and update statuses from server values', ()=>{

    endPointServiceMock
      .expects('post')
      .withArgs( '/toggle', { color: 'red' } )
      .returns({ then(resolved) {
          resolved({ color: 'red', status: true })
        }})
      .once()

    let colorToggleGroup = shallow(
      <ColorToggleGroup
        endPointService={endPointService}
      />).instance()

    colorToggleGroup.initializeStatuses()

    colorToggleGroup.toggleLight('red')

    expect(colorToggleGroup.state.statuses).to.deep.equal(
      [
        { "color": "red", "status": true},
        { "color": "green", "status": false},
        { "color": "blue", "status": false}
      ]
    )

    endPointServiceMock.verify()
  })

})