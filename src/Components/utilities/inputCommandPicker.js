import React, { Component } from 'react'
import Select from 'react-select'
import InputSelect from './InputSelect.js'
import {
    inputTypesDropDown,
    one127,
    noteDropDown,
    oneSixteen,
    ccDropDown,
    inputs,
    numberOfInputs
} from './inMidiTables'
import ChannelSelect from './ChannelSelect.js'





export class inputCommandPicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 'picker' + 1,
            parentCh: 1,
            type: ['None', 0],
            command: 0,
            channel: 11,
            sysex: 'Enter HEX data here',
            selectedIns: 0x01,
            selectedCh: 256,
            note: ['Select A Note', 129]
        }

        this.channelSelect = this.channelSelect.bind(this)

    }

    getChannels = (channels) => {
        this.setState({ selectedCh: channels })
    }


    channelSelect = () => {
        return (
            < tr >
                <td>
                    CH:
                </td>
                <td>
                    <ChannelSelect sendData={this.getChannels} data={this.state.selectedCh} />
                </td>
            </tr >
        )
    }

    handleInSelData = (theData) => {
        console.log('The Data that was sent = ' + theData)
        console.log(theData)
        this.setState({ selectedIns: theData })
    }

    inputSelect = () => {
        return (
            < tr >
                <td>
                    Input:
                </td>
                <td>
                    <InputSelect
                        data={{
                            ins: numberOfInputs,
                            selection: this.state.selectedIns
                        }}
                        sendData={this.handleInSelData}
                    />
                </td>
            </tr >
        )
    }

    noteSelect = () => {
        return (
            < tr >
                <td>
                    Note:
                </td>
                <td>
                    <Select
                        name='typeSelector'
                        styles={selectStyle}
                        hideResetButton='true'
                        style={{ textAlign: 'left' }}
                        options={noteDropDown()}
                        value={{
                            label: this.state.note[0],
                            value: this.state.note[1]
                        }}
                        theme="default"
                        onChange={(e) => { this.handleNoteChange(e) }}
                    />
                </td>
            </tr >
        )
    }

    ccSelect = () => {
        return (
            < tr >
                <td>
                    CC#:
                </td>
                <td>
                    Pick a Controller
                </td>
            </tr >
        )
    }

    pgmSelect = () => {
        return (
            < tr >
                <td>
                    PGM#:
                </td>
                <td>
                    Pick a Program
                </td>
            </tr >
        )
    }

    sysexData = () => {
        return (
            < tr >
                <td>
                    DATA:
                </td>
                <td>
                    Enter Sys Ex Data
                </td>
            </tr >
        )
    }

    songSelect = () => {
        return (
            < tr >
                <td>
                    Song:
                </td>
                <td>
                    Pick a Song
                </td>
            </tr >
        )
    }

    handleTypeChange = (e) => {
        console.log(e.label)
        this.setState({ type: [e.label, e.value] })
    }

    handleChannelChange = (e) => {
        console.log(e)
        this.setState({ channel: e.value + 1 })
    }

    printState = () => {
        console.log(this.state)
    }


    render() {
        let underType = 'Under Type'
        underType = []

        if (this.state.type[0] !== 'None') {
            underType.push(
                this.inputSelect(),
            )
        }

        switch (this.state.type[0]) {
            case 'None':
                break

            case 'Note On':
                underType.push(
                    this.channelSelect(),
                    this.noteSelect()
                )
                break

            case 'Note Off':
                underType.push(
                    this.channelSelect(),
                    this.noteSelect()
                )
                break

            case 'Control Change':
                underType.push(
                    this.channelSelect(),
                    this.ccSelect()
                )
                break

            case 'Program Change':
                underType.push(
                    this.channelSelect(),
                    this.pgmSelect()
                )
                break

            case 'Pitch Bend':
                underType.push(
                    this.channelSelect(),
                    //this.pgmSelect()
                )
                break

            case 'Sys Ex':
                underType.push(
                    this.sysexData()
                )
                break

            case 'Song Select':
                underType.push(
                    this.songSelect()
                )
                break

            default:
        }


        return (
            <div className="pickerTopDiv" style={mainDiv}>
                <button onMouseDown={this.printState}>STATE</button>
                <hr />
                <table id={"pickerTable" + this.props.channel} style={{ width: "100%" }}>
                    <colgroup>
                        <col width="1px" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td colSpan="2" style={pickerTitle}>
                                Input Command Picker
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
                                        options={inputTypesDropDown()}
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
                        {underType}
                    </tbody>
                </table>
            </div>
        )
    }
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
    fontSize: '12px',
    cursor: 'context-menu'
}
//////////////////////////////////////////// Style //

export default inputCommandPicker
