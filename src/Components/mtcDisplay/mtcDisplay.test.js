import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MtcDisplay from './mtcDisplay'

Enzyme.configure({ adapter: new Adapter() })

it('shoult renter the main div', () => {
    const wrapper = shallow(<MtcDisplay />)
    const div = wrapper.find('div.mainDiv')
    expect(div.exists()).toBe(true)
})

it('shoult renter the digit cells', () => {
    const wrapper = shallow(<MtcDisplay />)
    
    const hrs = wrapper.find('td.hourCell')
    expect(hrs.exists()).toBe(true)

    const mins = wrapper.find('td.minuteCell')
    expect(mins.exists()).toBe(true)

    const secs = wrapper.find('td.secondCell')
    expect(secs.exists()).toBe(true)

    const frms = wrapper.find('td.frameCell')
    expect(frms.exists()).toBe(true)
})