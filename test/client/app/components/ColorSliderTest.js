import {assert} from 'chai'
import {shallow} from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import ColorSlider from '../../../../src/client/app/components/ColorSlider'

describe('<ColorSlider />', () => {

  it('sliding should notify change to handler', () => {

    let changeHandler = sinon.spy()

    let colorSlider = shallow(<ColorSlider color={'red'} initialLevel={128} onChange={changeHandler} />).instance()

    colorSlider.valueChanged({}, 123)

    assert(changeHandler.calledWith('red', 255 - 123))

  })

})