import {shallow} from 'enzyme'
import React from 'react'
import {expect} from 'chai'

import ColorToggleGroup from '../../../../src/client/app/components/ColorToggleGroup'

describe('<ColorToggleGroup/>', () => {

  it('should render same number of <ColorToggle/> as statuses', () => {

    let colorToggleGroup = shallow(<ColorToggleGroup
      statuses={
        [
          {"color": "red", status: true},
          {"color": "brown", status: false}
        ]
      } onStatusUpdate={()=>{}}/>)

    let toggles = colorToggleGroup.find('ColorToggle')

    expect(toggles.length).to.be.eql(2)
  })

  it('should have the right color props in <ColorToggle/> as status', () => {

    let colorToggleGroup = shallow(<ColorToggleGroup
      statuses={
        [
          {"color": "red", status: true},
        ]
      } onStatusUpdate={()=>{}}/>)

    let toggle = colorToggleGroup.find('ColorToggle')

    expect(toggle.props().colorLabel).to.be.eql('red')
  })

  it('initialize its children initialStatuses', () => {

    let colorToggleGroup = shallow(<ColorToggleGroup
      statuses={
        [
          {"color": "red", status: true},
        ]
      } onStatusUpdate={()=>{}}/>)

    let toggle = colorToggleGroup.find('ColorToggle')

    expect(toggle.props().initialStatus).to.be.eql(true)
  })

})