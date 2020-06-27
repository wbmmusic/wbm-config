import React, { Component } from 'react'
import Select from 'react-select'
import { v4 as uuid } from 'uuid';
import {
    typesDropDown,
    one127,
    noteDropDown,
    oneSixteen,
    ccDropDown
} from './midiTables'

export function defaultStateData(id) {
    const defaultState =
    {
        id: 'picker' + id,
        parentCh: id,
        type: ['None', 0],
        command: 0,
        channel: 11,
        byte0: 154,
        byte1: 56,
        byte2: 120,
        showByte0: false,
        showByte1: false,
        showByte2: false,
        hexOutput: [],
        textOutput: [],
        sysex: 'Enter HEX data here'
    }
    return defaultState
}

export function makeOutputCmd(type, chnl) {
    //console.log('Make Command')
    let tmpCmd = 'Error'
    let wasGood = true

    if (type === 'None') {
        tmpCmd = 0
    } else if (type === 'Note On') {
        tmpCmd = 144 + chnl
    } else if (type === 'Note Off') {
        tmpCmd = 128 + chnl
    } else if (type === 'Control Change') {
        tmpCmd = 176 + chnl
    } else if (type === 'Program Change') {
        tmpCmd = 192 + chnl
    } else if (type === 'Sys Ex') {
        tmpCmd = 'SYSEX'
    } else if (type === 'Song Select') {
        tmpCmd = 243
    } else if (type === 'Start') {
        tmpCmd = 250
    } else if (type === 'Continue') {
        tmpCmd = 251
    } else if (type === 'Stop') {
        tmpCmd = 252
    } else if (type === 'System Reset') {
        tmpCmd = 255
    } else {
        wasGood = false
        console.log('ERROR - Command Picker makeCmd didnt recognize this command type ' + type)
    }

    return [wasGood, tmpCmd]
}

export class outputCmdPicker extends Component {

    constructor(props) {
        super(props)
        //console.log('XXXX Picker Constructor #' + thisPickersChannel)

        if (props.statex === undefined) {
            //console.log('XXXA No State Def in Picker ' + this.props.channel)
            this.state = defaultStateData('temp')

        } else {
            //console.log('XXXA State Deffined in Picker ' + this.props.channel)
            this.state = defaultStateData(props.channel)
        }

        this.enterSysex = this.enterSysex.bind(this)
    }

    sendNsetState = (tempState) => {
        this.setState(tempState)
        if (this.props.getStructure !== undefined) {
            this.props.getStructure(this.state.parentCh, tempState)
        }
    }

    enterSysex(e) {
        var tempState = this.state
        tempState.sysex = e.target.value

       // console.log('Send state - SysEx change')
        this.sendNsetState(tempState)
    }

    componentDidMount() {
        if (this.props.getStructure !== undefined) {
            if (this.props.statex !== this.state) {
               // console.log('Send state - componentDidMount')
                this.props.getStructure(this.state.parentCh, this.state)
            }
        }
    }

    componentDidUpdate(){
        //console.log('Component Did Update')
    }

    handleChangeChannel(e) {
        var tempState = this.state

        var tmpCmd = makeOutputCmd(this.state.type[0], e.value)
        if (tmpCmd[0]) {
            tempState.channel = parseInt(e.value) + 1
            tempState.command = tmpCmd[1]

           // console.log('Send state - CH change to CH# ' + (parseInt(e.value) + 1))
            this.sendNsetState(tempState)
        }
    }

    handleChangeNoteCc(e) {
        var tempState = this.state
        tempState.byte1 = e.value

       // console.log('Send state - Note/CC change to CC# ' + e.value)
        this.sendNsetState(tempState)
    }

    handelChangeVelVal(e) {
        var tempState = this.state
        tempState.byte2 = e.value

       // console.log('Send state - Vel/Val Change to ' + e.value)
        this.sendNsetState(tempState)
    }

    handlePgmChange(e) {
        var tempState = this.state
        tempState.byte1 = e.value

       // console.log('Send state - PGM change to PGM# ' + e.value)
        this.sendNsetState(tempState)
    }

    handleSongSelect(e) {
        var tempState = this.state
        tempState.byte0 = e.value

       // console.log('Send state - Song change to Song# ' + e.value)
        this.sendNsetState(tempState)
    }

    handleTypeChange(e) {
        //console.log('Type Selector On Change Firing')
        var tempState = this.state

        tempState.type = [e.label, e.value]

        var tmpCmd = makeOutputCmd(e.label, this.state.channel - 1)

        // If there was no error making the command
        if (tmpCmd[0]) {
            tempState.command = tmpCmd[1]

            if (e.label === 'Note On' ||
                e.label === 'Note Off' ||
                e.label === 'Control Change') {

                tempState.showByte0 = true
                tempState.showByte1 = true
                tempState.showByte2 = true
                tempState.textOutput = [
                    decimalToHexString(this.state.command), ' | ',
                    decimalToHexString(this.state.byte1), ' | ',
                    decimalToHexString(this.state.byte2)
                ]
            } else if (e.label === 'Program Change' ||
                e.label === 'Song Select') {

                let outputDisplay
                if (e.label === 'Song Select') {
                    outputDisplay = [
                        decimalToHexString(this.state.command), ' | ',
                        decimalToHexString(this.state.byte0)
                    ]
                } else if (e.label === 'Program Change') {
                    outputDisplay = [
                        decimalToHexString(this.state.command), ' | ',
                        decimalToHexString(this.state.byte1)
                    ]
                }

                tempState.showByte0 = true
                tempState.showByte1 = true
                tempState.showByte2 = false
                tempState.textOutput = outputDisplay

            } else if (e.label === 'Sys Ex') {
                tempState.showByte0 = true
                tempState.showByte1 = false
                tempState.showByte2 = false
                tempState.textOutput = decimalToHexString(this.state.command)

            } else if (e.label === 'System Reset' || e.label === 'Start' ||
                e.label === 'Continue' || e.label === 'Stop' || e.label === 'None') {
                let outputDisplay
                if (e.label !== 'None') {
                    outputDisplay = [
                        decimalToHexString(this.state.command)
                    ]
                } else {
                    outputDisplay = []
                }

                tempState.showByte0 = false
                tempState.showByte1 = false
                tempState.showByte2 = false
                tempState.textOutput = outputDisplay
            }

           // console.log('Send state - Type change to ' + e.label)
            this.sendNsetState(tempState)
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.statex !== prevState) {
            return nextProps.statex;
        }
        else return null;
    }

    

    render() {
        //console.log('Render')
        //Rows default to being empty
        let byte0data = []
        let byte1data = []
        let byte2data = []
        let b0lbl = []
        let b1lbl = []
        let b2lbl = []

        let commandType = this.state.type[0]

        let makeChannelPicker = () => {
            b0lbl = ['CH:']
            byte0data = [
                <Select
                    name='channelSelector'
                    key={uuid()}
                    styles={selectStyle}
                    hideResetButton='true'
                    style={{ textAlign: 'left' }}
                    options={oneSixteen()}
                    value={{
                        label: this.state.channel,
                        value: this.state.channel,
                    }}
                    theme="default"
                    onChange={(e) => { this.handleChangeChannel(e) }}
                />
            ]
        }

        let makeSongPicker = () => {
            b0lbl = ['Song:']
            let point = this.state.byte0
            if (point > 127) {
                point = 0
            }
            byte0data = [
                <Select
                    name="songSelector"
                    key={uuid()}
                    styles={selectStyle}
                    hideResetButton='true'
                    style={{ textAlign: 'left' }}
                    options={one127()}
                    value={{
                        label: one127()[point].label,
                        value: one127()[point].value,
                    }}
                    theme="default"
                    onChange={(e) => { this.handleSongSelect(e) }}
                />
            ]
        }

        let makeSysexDataInput = () => {
            b0lbl = ['DATA:']
            byte0data = [
                <input
                    key={'sysexInput' + this.state.parentCh}
                    type='text'
                    onChange={this.enterSysex}
                    value={this.state.sysex}
                    style={{ width: '97%' }}
                ></input>
            ]
        }

        let makeNotePicker = () => {
            b1lbl = ['Note:']
            byte1data = [
                <Select
                    name='noteSelector'
                    key={uuid()}
                    styles={selectStyle}
                    hideResetButton='true'
                    style={{ textAlign: 'left' }}
                    options={noteDropDown()}
                    value={{
                        label: noteDropDown()[this.state.byte1].label,
                        value: noteDropDown()[this.state.byte1].value,
                    }}
                    theme="default"
                    onChange={(e) => { this.handleChangeNoteCc(e) }}
                />
            ]
        }

        let makeCcPicker = () => {
            b1lbl = ['CC#:']
            byte1data = [
                <Select
                    name='ccSelector'
                    key={uuid()}
                    styles={selectStyle}
                    hideResetButton='true'
                    style={{ textAlign: 'left' }}
                    options={ccDropDown()}
                    value={{
                        label: ccDropDown()[this.state.byte1].label,
                        value: ccDropDown()[this.state.byte1].value,
                    }}
                    theme="default"
                    onChange={(e) => { this.handleChangeNoteCc(e) }}
                />
            ]
        }

        let makePgmPicker = () => {
            b1lbl = ['PGM#:']
            byte1data = [
                <Select
                    name='pcSelector'
                    key={uuid()}
                    styles={selectStyle}
                    hideResetButton='true'
                    style={{ textAlign: 'left' }}
                    options={one127()}
                    value={{
                        label: one127()[this.state.byte1].label,
                        value: one127()[this.state.byte1].value,
                    }}
                    theme="default"
                    onChange={(e) => { this.handlePgmChange(e) }}
                />
            ]
        }

        let makeVelPicker = () => {
            b2lbl = ['Vel:']
            byte2data = [
                <Select
                    name='velocitySelector'
                    key={uuid()}
                    styles={selectStyle}
                    hideResetButton='true'
                    style={{ textAlign: 'left' }}
                    options={one127()}
                    value={{
                        label: this.state.byte2,
                        value: this.state.byte2 - 1,
                    }}
                    theme="default"
                    onChange={(e) => { this.handelChangeVelVal(e) }}
                />
            ]
        }

        let makeValPicker = () => {
            //console.log('IN HERE CC YUP ch: ' + this.props.channel)
            b2lbl = ['Val:']
            byte2data = [
                <Select
                    name='valueSelector'
                    key={uuid()}
                    styles={selectStyle}
                    hideResetButton='true'
                    style={{ textAlign: 'left' }}
                    options={one127()}
                    value={{
                        label: this.state.byte2,
                        value: this.state.byte2 - 1,
                    }}
                    theme="default"
                    onChange={(e) => { this.handelChangeVelVal(e) }}
                />
            ]
        }

        // Populate the Rows or not
        switch (commandType) {
            case 'Note On':
                makeChannelPicker()
                makeNotePicker()
                makeVelPicker()
                break

            case 'Note Off':
                makeChannelPicker()
                makeNotePicker()
                makeVelPicker()
                break

            case 'Control Change':
                makeChannelPicker()
                makeCcPicker()
                makeValPicker()
                break

            case 'Program Change':
                makeChannelPicker()
                makePgmPicker()
                break

            case 'Song Select':
                makeSongPicker()
                break

            case 'Sys Ex':
                makeSysexDataInput()
                break

            default:
            // Leave it all blank
        }


        return (
            <div className="pickerTopDiv" style={mainDiv}>
                <table id={"pickerTable" + this.props.channel} style={{ width: "100%" }}>
                    <colgroup>
                        <col width="1px" />
                    </colgroup>
                    <tbody style={{ width: "100%" }}>
                        <tr>
                            <td colSpan="2" style={pickerTitle}>
                                Output Command Picker
                            </td>
                        </tr>
                        <tr>
                            <td style={td}>
                                <div id="typeLbl" style={label}>Type:</div>
                            </td>
                            <td style={td}>
                                <div id="typeDiv">
                                    <Select
                                        name='typeSelector'
                                        styles={selectStyle}
                                        hideResetButton='true'
                                        style={{ textAlign: 'left' }}
                                        options={typesDropDown()}
                                        value={{
                                            label: this.state.type[0],
                                            value: this.state.type[1]
                                        }}
                                        theme="default"
                                        onChange={(e) => { this.handleTypeChange(e) }}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={td}>
                                <div id="byte0Lbl" style={label}>{b0lbl}</div>
                            </td>
                            <td style={td}>
                                <div id="byte0Div">
                                    {byte0data}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={td}>
                                <div id="byte1Lbl" style={label}>{b1lbl}</div>
                            </td>
                            <td style={td}>
                                <div id="byte1Div">
                                    {byte1data}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={td}>
                                <div id="byte2Lbl" style={label}>{b2lbl}</div>
                            </td>
                            <td style={td}>
                                <div id="byte2Div">
                                    {byte2data}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {this.state.textOutput}
            </div>
        )
    }
}

function decimalToHexString(number) {
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }
    return number.toString(16).toUpperCase();
}

// Style ////////////////////////////////////////////
const mainDiv = {
    backgroundColor: 'lightgrey',
    padding: '8px',
    maxWidth: '500px',
    borderRadius: '10px',
    margin: '4px',
    fontSize: '12px'
}

const td = {
    border: '1px black solid',
}

const pickerTitle = {
    //border: '1px black solid',
    padding: '2px',
    textAlign: 'center',
}

const selectStyle = {
    control: base => ({
        ...base,
        fontSize: '12px',
        minHeight: '15px'
    }),
    menu: base => ({
        ...base,
        fontSize: '12px'
    }),
    dropdownIndicator: base => ({
        ...base,
        padding: '0px 8px'
    }),
    valueContainer: base => ({
        ...base,
        padding: '0px 8px'
    })
};

const label = {
    textAlign: 'right',
    paddingLeft: '5px',
    fontSize: '12px'
}
//////////////////////////////////////////// Style //

export default outputCmdPicker