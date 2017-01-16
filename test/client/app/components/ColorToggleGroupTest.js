import {shallow} from 'enzyme'
import React from 'react'
import {expect} from 'chai'

import ColorToggleGroup from '../../../../src/client/app/components/ColorToggleGroup'

describe('<cColorToggleGroup/>', () => {

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

})