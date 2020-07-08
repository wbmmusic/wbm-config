import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Select from 'react-select'
import OutputCmdPicker, { defaultStateData, makeOutputCmd } from './outputCmdPicker'
import {
    typesDropDown,
    one127,
    noteDropDown,
    oneSixteen,
    ccDropDown
} from '../midiTables'

Enzyme.configure({ adapter: new Adapter() })

function expectNothing(wrapper, target) {
    //console.log('We in expect nothing')
    const temp = wrapper.find('[id="' + target + '"]')
    expect(temp.text().length).toBe(0)
}

function checkSelectsAgainstState(state, wrapper, label) {

    //Type
    //Check the type fields
    const typeLbl = wrapper.find('[id="typeLbl"]')
    expect(typeLbl.text()).toBe("Type:")

    const typeSel2 = wrapper.find('[id="typeDiv"]')
    const theText = typeSel2.find(Select).props().value.label
    //console.log('Picker is displaying ' + theText)
    expect(theText).toBe(label)

    if (
        label === "None" ||
        label === "Start" ||
        label === "Continue" ||
        label === "Stop" ||
        label === "System Reset"
    ) {
        //console.log('--> ' + label)

        //Byte 0
        expectNothing(wrapper, 'byte0Lbl')
        expectNothing(wrapper, 'byte0Div')
        //Byte 1
        expectNothing(wrapper, 'byte1Lbl')
        expectNothing(wrapper, 'byte1Div')
        //Byte 2
        expectNothing(wrapper, 'byte2Lbl')
        expectNothing(wrapper, 'byte2Div')

    } else if (
        label === "Note On" ||
        label === "Note Off"
    ) {
        //console.log('--> ' + label)

        //Channel
        const byte0Lbl = wrapper.find('[id="byte0Lbl"]')
        expect(byte0Lbl.text()).toBe('CH:')
        const byte0Div = wrapper.find('[id="byte0Div"]')
        expect(byte0Div.html().includes('<div class=" css-1uccc91-singleValue">' + oneSixteen()[state.channel - 1].label + '</div>')).toBe(true)

        //Note
        const byte1Lbl = wrapper.find('[id="byte1Lbl"]')
        expect(byte1Lbl.text()).toBe('Note:')
        const byte1Div = wrapper.find('[id="byte1Div"]')
        expect(byte1Div.html().includes('<div class=" css-1uccc91-singleValue">' + noteDropDown()[state.byte1].label + '</div>')).toBe(true)

        //Velocity
        const byte2Lbl = wrapper.find('[id="byte2Lbl"]')
        expect(byte2Lbl.text()).toBe('Vel:')
        const byte2Div = wrapper.find('[id="byte2Div"]')
        expect(byte2Div.html().includes('<div class=" css-1uccc91-singleValue">' + one127()[state.byte2].label + '</div>')).toBe(true)

    } else if (label === "Control Change") {
        //console.log('--> ' + label)

        //Channel
        const byte0Lbl = wrapper.find('[id="byte0Lbl"]')
        expect(byte0Lbl.text()).toBe('CH:')
        const byte0Div = wrapper.find('[id="byte0Div"]')
        expect(byte0Div.html().includes('<div class=" css-1uccc91-singleValue">' + oneSixteen()[state.channel - 1].label + '</div>')).toBe(true)

        //CC#
        const byte1Lbl = wrapper.find('[id="byte1Lbl"]')
        expect(byte1Lbl.text()).toBe('CC#:')
        const byte1Div = wrapper.find('[id="byte1Div"]')
        expect(byte1Div.html().includes('<div class=" css-1uccc91-singleValue">' + ccDropDown()[state.byte1].label + '</div>')).toBe(true)

        //Value
        const byte2Lbl = wrapper.find('[id="byte2Lbl"]')
        expect(byte2Lbl.text()).toBe('Val:')
        const byte2Div = wrapper.find('[id="byte2Div"]')
        expect(byte2Div.html().includes('<div class=" css-1uccc91-singleValue">' + one127()[state.byte2].label + '</div>')).toBe(true)

    } else if (label === "Program Change") {
        //console.log('--> ' + label)
        //Lables
        const byte0Lbl = wrapper.find('[id="byte0Lbl"]')
        expect(byte0Lbl.text()).toBe('CH:')

        const byte1Lbl = wrapper.find('[id="byte1Lbl"]')
        expect(byte1Lbl.text()).toBe('PGM#:')

        expectNothing(wrapper, 'byte2Lbl')

        //Selects
        const byte0Div = wrapper.find('[id="byte0Div"]')
        expect(byte0Div.html().includes('<div class=" css-1uccc91-singleValue">' + oneSixteen()[state.channel - 1].label + '</div>')).toBe(true)

        const byte1Div = wrapper.find('[id="byte1Div"]')
        expect(byte1Div.html().includes('<div class=" css-1uccc91-singleValue">' + one127()[state.byte1].label + '</div>')).toBe(true)

        expectNothing(wrapper, 'byte2Div')

    } else if (label === "Sys Ex") {
        //console.log('--> ' + label)
        //Lables
        const byte0Lbl = wrapper.find('[id="byte0Lbl"]')
        expect(byte0Lbl.text()).toBe('DATA:')

        expectNothing(wrapper, 'byte1Lbl')
        expectNothing(wrapper, 'byte2Lbl')


        //Selects
        const byte0Div = wrapper.find('[id="byte0Div"]')
        expect(byte0Div.html().length).toBeGreaterThan(0)

        expectNothing(wrapper, 'byte1Div')
        expectNothing(wrapper, 'byte2Div')

    } else if (label === "Song Select") {
        //console.log('--> ' + label)

        //Song
        const byte0Lbl = wrapper.find('[id="byte0Lbl"]')
        expect(byte0Lbl.text()).toBe('Song:')

        const byte0Div = wrapper.find('[id="byte0Div"]')
        let pointer = 0
        if (state.byte0 < 128) {
            pointer = state.byte0
        }
        expect(byte0Div.html().includes('<div class=" css-1uccc91-singleValue">' + one127()[pointer].label + '</div>')).toBe(true)

        //Byte 1
        expectNothing(wrapper, 'byte1Lbl')
        expectNothing(wrapper, 'byte1Div')
        //Byte 2
        expectNothing(wrapper, 'byte2Lbl')
        expectNothing(wrapper, 'byte2Div')

    } else {
        console.warn('Missed ' + label)
    }
}

//Sets the showBytes states based on Type in state
let setShowBytes = (state) => {
    if (state.type[0] === 'Note On' ||
        state.type[0] === 'Note Off' ||
        state.type[0] === 'Control Change') {
        //console.log('NOn NOf CC')
        state.showByte0 = true
        state.showByte1 = true
        state.showByte2 = true
    } else if (state.type[0] === 'Program Change' ||
        state.type[0] === 'Song Select') {
        //console.log('NOn NOf CC')
        state.showByte0 = true
        state.showByte1 = true
        state.showByte2 = false
    } else if (state.type[0] === 'Sys Ex') {
        //console.log('NOn NOf CC')
        state.showByte0 = true
        state.showByte1 = false
        state.showByte2 = false
    } else if (state.type[0] === 'System Reset' ||
        state.type[0] === 'Start' ||
        state.type[0] === 'Continue' ||
        state.type[0] === 'Stop' ||
        state.type[0] === 'None') {
        state.showByte0 = false
        state.showByte1 = false
        state.showByte2 = false
    }
    return state
}

it('Steps through types with no props', () => {
    console.log('TEST: Steps through types with no props')

    let state = defaultStateData(1)
    const wrapper = shallow(<OutputCmdPicker />)

    //Step through each type
    for (var i = 0; i < typesDropDown().length; i++) {

        //Select the type
        const another = wrapper.find('[name="typeSelector"]')
        another.simulate('change', typesDropDown()[i]);
        //console.log('Change To -> ' + typesDropDown()[i].label)

        checkSelectsAgainstState(state, wrapper, typesDropDown()[i].label)
    }
})

it('Steps through each types Dropdowns with no props', () => {
    console.log('TEST: Steps through each types Dropdowns with no props')

    let state = defaultStateData()
    const wrapper = shallow(<OutputCmdPicker />)

    //Step through each type
    for (var i = 0; i < typesDropDown().length; i++) {
        const another = wrapper.find('[name="typeSelector"]')
        another.simulate('change', typesDropDown()[i]);

        const byte0Lbl = wrapper.find('[id="byte0Lbl"]')
        //if (byte0Lbl.text().length > 0) { console.log('BYTE0 label = '+byte0Lbl.text()) }
        if (byte0Lbl.text() === "CH:") {

            //console.log('Checking ' + typesDropDown()[i].label + ' drop down menus')
            for (var tempChCtr = 0; tempChCtr < 5; tempChCtr++) {
                const temp = wrapper.find('[name="channelSelector"]')
                expect(temp.exists()).toBe(true)

                const tempCh = Math.round(Math.random() * 15)
                state.channel = tempCh + 1
                //console.log('----- CHANGE CHANNEL to ' + (tempCh + 1))
                temp.simulate('change', oneSixteen()[tempCh]);
                //console.log('CH set to ' + state.channel)

                checkSelectsAgainstState(state, wrapper, typesDropDown()[i].label)
            }
        } else if (byte0Lbl.text() === "Song:") {
            //console.log('Checking ' + typesDropDown()[i].label + ' drop down menus')
            for (var tempSongCtr = 0; tempSongCtr < 5; tempSongCtr++) {
                const temp = wrapper.find('[name="songSelector"]')
                expect(temp.exists()).toBe(true)

                const tempSong = Math.round(Math.random() * 127)
                state.byte0 = tempSong
                temp.simulate('change', one127()[tempSong]);
                //console.log('Song set to ' + state.byte0)

                checkSelectsAgainstState(state, wrapper, typesDropDown()[i].label)
            }
        }

        const byte1Lbl = wrapper.find('[id="byte1Lbl"]')
        //if (byte1Lbl.text().length > 0) { console.log('BYTE1 label = '+byte1Lbl.text()) }
        if (byte1Lbl.text() === "Note:") {
            for (var tempNoteCtr = 0; tempNoteCtr < 5; tempNoteCtr++) {
                const temp = wrapper.find('[name="noteSelector"]')
                expect(temp.exists()).toBe(true)

                const tempNote = Math.round(Math.random() * 127)
                state.byte1 = tempNote
                temp.simulate('change', noteDropDown()[tempNote]);
                //console.log('Song set to ' + state.byte0)

                checkSelectsAgainstState(state, wrapper, typesDropDown()[i].label)
            }
        } else if (byte1Lbl.text() === "CC#:") {
            for (var tempCcCtr = 0; tempCcCtr < 5; tempCcCtr++) {
                const temp = wrapper.find('[name="ccSelector"]')
                expect(temp.exists()).toBe(true)

                const tempCc = Math.round(Math.random() * 127)
                state.byte1 = tempCc
                temp.simulate('change', ccDropDown()[tempCc]);
                //console.log('Song set to ' + state.byte0)

                checkSelectsAgainstState(state, wrapper, typesDropDown()[i].label)
            }
        } else if (byte1Lbl.text() === "PGM#:") {
            for (var tempPgmCtr = 0; tempPgmCtr < 5; tempPgmCtr++) {
                const temp = wrapper.find('[name="pcSelector"]')
                expect(temp.exists()).toBe(true)

                const tempPgm = Math.round(Math.random() * 127)
                state.byte1 = tempPgm
                temp.simulate('change', one127()[tempPgm]);
                //console.log('Song set to ' + state.byte0)

                checkSelectsAgainstState(state, wrapper, typesDropDown()[i].label)
            }
        }

        const byte2Lbl = wrapper.find('[id="byte2Lbl"]')
        //if (byte2Lbl.text().length > 0) { console.log('BYTE2 label = '+byte2Lbl.text()) }
        if (byte2Lbl.text() === "Vel:") {
            for (var tempVelCtr = 0; tempVelCtr < 5; tempVelCtr++) {
                const temp = wrapper.find('[name="velocitySelector"]')
                expect(temp.exists()).toBe(true)

                const tempVel = Math.round(Math.random() * 127)
                state.byte2 = tempVel
                temp.simulate('change', one127()[tempVel]);
                //console.log('Song set to ' + state.byte0)

                checkSelectsAgainstState(state, wrapper, typesDropDown()[i].label)
            }
        } else if (byte2Lbl.text() === "Val:") {
            for (var tempValCtr = 0; tempValCtr < 5; tempValCtr++) {
                const temp = wrapper.find('[name="valueSelector"]')
                expect(temp.exists()).toBe(true)

                const tempVal = Math.round(Math.random() * 127)
                state.byte2 = tempVal
                temp.simulate('change', one127()[tempVal]);
                //console.log('Song set to ' + state.byte0)

                checkSelectsAgainstState(state, wrapper, typesDropDown()[i].label)
            }
        }

    }

})

it('Steps through types using props', () => {
    console.log('TEST: Steps through types using props')

    const wrapper = shallow(<OutputCmdPicker />)

    //Step through each type
    for (var i = 0; i < typesDropDown().length; i++) {
        //console.log('Test Type ' + typesDropDown()[i].label + ' with props')

        // Set Up The State /////////////////////////////////////////////////////////
        let state = defaultStateData(1)

        state.type[0] = typesDropDown()[i].label
        state.type[1] = typesDropDown()[i].value
        state.id = 1
        state.parentCh = 1

        //console.log(state.type)
        var tmpCmd = makeOutputCmd(typesDropDown()[i].label, state.channel)

        if (tmpCmd[0]) {
            state.command = tmpCmd[1]
        }

        state = setShowBytes(state)
        ///////////////////////////////////////////////////////// Set Up The State //

        //Pass the state as a prop to the command picker
        wrapper.setProps({ statex: state })

        //Select the type
        const another = wrapper.find('[name="typeSelector"]')
        another.simulate('change', typesDropDown()[i]);
        //console.log('Change To -> ' + typesDropDown()[i].label)

        checkSelectsAgainstState(state, wrapper, typesDropDown()[i].label)

        //Check Compare picker state to testing temp state
        expect(wrapper.state().toString()).toBe(state.toString())
    }
})

it('Steps through each types Dropdowns using props', () => {
    console.log('TEST: Steps through each types Dropdowns using props')

    const wrapper = shallow(<OutputCmdPicker />)

    //Step through each type
    for (var i = 0; i < typesDropDown().length; i++) {
        //console.log('Test Type ' + typesDropDown()[i].label + ' with props')

        for (var numPerType = 0; numPerType < 5; numPerType++) {
            // Set Up The State /////////////////////////////////////////////////////////
            let state = defaultStateData(1)

            state.type[0] = typesDropDown()[i].label
            state.type[1] = typesDropDown()[i].value

            var id = Math.round(Math.random() * 127)
            state.id = id
            state.parentCh = id

            state = setShowBytes(state)

            if (state.type[0] === 'Note On' ||
                state.type[0] === 'Note Off' ||
                state.type[0] === 'Control Change') {
                //console.log('NOn NOf CC')

                //Set Channel
                state.channel = Math.round(Math.random() * 15) + 1
                //Set Note / CC#
                state.byte1 = Math.round(Math.random() * 127)
                //Set Velocity / Val
                state.byte2 = Math.round(Math.random() * 127)

                //console.log('CH# ' + state.channel + ' Note/CC# ' + state.byte1 + ' Vel/Val ' + state.byte2)

            } else if (state.type[0] === 'Program Change') {
                //console.log('NOn NOf CC')

                //Set Channel
                state.channel = Math.round(Math.random() * 15) + 1
                //Set PGM#
                state.byte1 = Math.round(Math.random() * 127)

                //console.log('CH# ' + state.channel + ' PGM# ' + state.byte1)

            } else if (state.type[0] === 'Song Select') {

                //Set Song
                state.byte1 = Math.round(Math.random() * 127)
                //console.log('Song # ' + state.byte1)
            }

            //console.log(state.type)
            var tmpCmd = makeOutputCmd(state.type[0], state.channel)
            if (tmpCmd[0]) {
                state.command = tmpCmd[1]
            }
            ///////////////////////////////////////////////////////// Set Up The State //

            //Pass the state as a prop to the command picker
            wrapper.setProps({ statex: state })

            //Select the type
            const another = wrapper.find('[name="typeSelector"]')
            another.simulate('change', typesDropDown()[i]);
            //console.log('Change To -> ' + state.type[0])

            checkSelectsAgainstState(state, wrapper, state.type[0])

            //Check Compare picker state to testing temp state
            expect(wrapper.state().toString()).toBe(state.toString())
        }
    }
})

it('Steps through types using props and callbacks', () => {
    console.log('TEST: Steps through types using props and callbacks')


    let messageFromPicker = jest.fn()

    let state = defaultStateData(1)

    //console.log('---> Create OutputCmdPicker')
    const wrapper = shallow(<OutputCmdPicker statex={state} getStructure={messageFromPicker} />)

    //console.log('---> Expect Structure')
    // The mock function was called at least once with the specified args
    expect(messageFromPicker).toHaveBeenCalledWith(state.parentCh, state);

    //console.log('---> Mock Reset')
    messageFromPicker.mockReset()

    //console.log('>>>> MADE IT THROUGH SETUP')

    for (var i = 0; i < typesDropDown().length; i++) {
        //console.log('Test Type ' + typesDropDown()[i].label + ' with props and callback')

        // Set Up The State /////////////////////////////////////////////////////////
        let state = defaultStateData(1)

        state.type[0] = typesDropDown()[i].label
        state.type[1] = typesDropDown()[i].value
        const id = 1
        state.id = 'picker' + id
        state.parentCh = id

        //console.log(state.type)
        var tmpCmd = makeOutputCmd(typesDropDown()[i].label, state.channel - 1)

        if (tmpCmd[0]) {
            state.command = tmpCmd[1]
        }

        state = setShowBytes(state)
        ///////////////////////////////////////////////////////// Set Up The State //

        //console.log('---> Change Type to ' + typesDropDown()[i].label)
        //Select the type
        var another = wrapper.find('[name="typeSelector"]')
        another.simulate('change', typesDropDown()[i]);
        //console.log('Change To -> ' + typesDropDown()[i].label)

        // The mock function was called at least once with the specified args
        //console.log('---> Expect Structure')

        var tempParCh = messageFromPicker.mock.calls[0][0]
        var readState = messageFromPicker.mock.calls[0][1]
        var tempState = state

        expect(tempParCh).toBe(1)
        tempState.textOutput = []
        expect(tempState).toBe(state);

        //console.log('---> Mock Reset')
        messageFromPicker.mockReset()

        //console.log('---> Check Test State againsd component state')
        //Check Compare picker state to testing temp state
        expect(wrapper.state().toString()).toBe(state.toString())

        //console.log('---> Set Statex')
        //Pass the state as a prop to the command picker
        wrapper.setProps({ statex: readState })

        //console.log('---> Expect No Response from component because states match')
        expect(messageFromPicker).toBeCalledTimes(0);
        messageFromPicker.mockReset()

        //console.log('---> checkSelectsAgainstState()')
        checkSelectsAgainstState(state, wrapper, typesDropDown()[i].label)
    }

})

// STILL NEED TO MAKE IT STEP THROUGH EACH DROPDOWN FOR EACH TYPE
it('Steps through each types Dropdowns using props and callbacks', () => {
    console.log('TEST: Steps through each types Dropdowns using props and callbacks')

    let messageFromPicker = jest.fn()

    let state = defaultStateData(1)

    //console.log('---> Create OutputCmdPicker')
    const wrapper = shallow(<OutputCmdPicker statex={state} getStructure={messageFromPicker} />)

    //console.log('---> Expect Structure')
    // The mock function was called at least once with the specified args
    expect(messageFromPicker).toHaveBeenCalledWith(state.parentCh, state);

    //console.log('---> Mock Reset')
    messageFromPicker.mockReset()

    //console.log('>>>> MADE IT THROUGH SETUP')

    for (var i = 0; i < typesDropDown().length; i++) {
        //console.log('Test Type ' + typesDropDown()[i].label + ' with props and callback')

        for (var tempChange = 0; tempChange < 5; tempChange++) {

            //console.log('TEMP CHANGE ======== ' + tempChange)
            // Set Up The State /////////////////////////////////////////////////////////
            let state = defaultStateData(1)

            state.type[0] = typesDropDown()[i].label
            state.type[1] = typesDropDown()[i].value
            const id = 1
            state.id = 'picker' + id
            state.parentCh = id

            //console.log(state.type)
            var tmpCmd = makeOutputCmd(typesDropDown()[i].label, state.channel - 1)

            if (tmpCmd[0]) {
                state.command = tmpCmd[1]
            } else {
                console.log('tmpCmd Issue ' + tmpCmd.toString())
            }

            state = setShowBytes(state)
            ///////////////////////////////////////////////////////// Set Up The State //

            //console.log('---> Change Type to ' + typesDropDown()[i].label)
            //Select the type
            const another = wrapper.find('[name="typeSelector"]')
            another.simulate('change', typesDropDown()[i]);

            // The mock function was called at least once with the specified args
            //console.log('---> Expect Structure')

            var tempParCh = messageFromPicker.mock.calls[0][0]
            var readState = messageFromPicker.mock.calls[0][1]
            var tempState = state

            expect(tempParCh).toBe(1)
            tempState.textOutput = []
            expect(tempState).toBe(state);

            //console.log('---> Mock Reset')
            messageFromPicker.mockReset()

            //console.log('---> Check Test State againsd component state')
            //Check Compare picker state to testing temp state
            expect(wrapper.state().toString()).toBe(state.toString())

            //console.log('---> Set Statex')
            //Pass the state as a prop to the command picker
            wrapper.setProps({ statex: readState })

            //console.log('---> Expect No Response from component because states match')
            expect(messageFromPicker).toBeCalledTimes(0);
            messageFromPicker.mockReset()

            //console.log('---> checkSelectsAgainstState()')
            checkSelectsAgainstState(state, wrapper, typesDropDown()[i].label)

        }
    }
})