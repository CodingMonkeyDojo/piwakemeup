import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import ColorToggle from '../../../../src/client/app/components/ColorToggle'
import ColorSlider from '../../../../src/client/app/components/ColorSlider'

import SingleColorControlGroup from '../../../../src/client/app/components/SingleColorControlGroup'

describe('<SingleColorControlGroup />', () => {

    it('contains toggle button of the parent color', () => {

        let controlGroup = shallow(<SingleColorControlGroup color="green" toggleStatus={true} />)

        let colorToggle = controlGroup.find(ColorToggle)

        expect(colorToggle.length).to.equal(1)
        expect(colorToggle.props().colorLabel).to.equal('green')
    })

    it('contains toggle button of the parent handler', () => {

        let handlerFunction = () => {}

        let controlGroup = shallow(<SingleColorControlGroup color="red" toggleStatus={true} onToggle={handlerFunction}/>)

        let colorToggle = controlGroup.find(ColorToggle)

        expect(colorToggle.props().onToggle).is.eql(handlerFunction)
    })

    it('contains toggle button of the parent initialStatus', () => {

        let controlGroup = shallow(<SingleColorControlGroup color="red" toggleStatus={false}/>)

        let colorToggle = controlGroup.find(ColorToggle)

        expect(colorToggle.props().initialStatus).is.equal(false)
    })

    it('contains slider of the parent color', () => {

        let controlGroup = shallow(<SingleColorControlGroup color="green" toggleStatus={true} />)

        let slider = controlGroup.find(ColorSlider)

        expect(slider.length).to.equal(1)
        expect(slider.props().color).to.equal('green')
    })

    it('contains slider of the parent powerLevel', () => {

        let controlGroup = shallow(<SingleColorControlGroup color="green" toggleStatus={true} powerLevel={26} />)

        let slider = controlGroup.find(ColorSlider)

        expect(slider.props().powerLevel).to.equal(26)
    })

    it('contains slider of the parent handler', () => {

        let handlerFunction = () => {}

        let controlGroup = shallow(<SingleColorControlGroup color="red" toggleStatus={true} onSlide={handlerFunction}/>)

        let slider = controlGroup.find(ColorSlider)

        expect(slider.props().onChange).to.equal(handlerFunction)
    })


})
