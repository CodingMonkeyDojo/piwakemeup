import {expect, assert} from 'chai'
import {shallow} from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import EndPointService from '../../../../src/client/app/EndPointService'

import ColorToggle from '../../../../src/client/app/components/ColorToggle.jsx'


describe('<ColorToggle />', ()=>{

  it('renders <Toggle> button', ()=>{

    const initialToggleStatus = {status: false}

    const newToggleStatus = { status: true }

    const endPointService = new EndPointService()

    sinon.stub(endPointService, 'post', () => {
      return { then(resolved) {
        resolved(newToggleStatus)
      }}
    })


    let toggleHandler = sinon.spy()

    let colorToggle = shallow(
      <ColorToggle
        colorLabel="Red"
        status={initialToggleStatus}
        onToggle={toggleHandler}
        endPointService={endPointService}
      />)

    colorToggle.instance().toggleLight()

    sinon.assert.calledWith(toggleHandler, newToggleStatus)
  })
})