import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import InputSelect from './InputSelect.js'
import {
    inputTypesDropDown,
    one127,
    noteDropDown,
    oneSixteen,
    ccDropDown,
    numberOfInputs
} from './inMidiTables'
import ChannelSelect from './ChannelSelect.js'
import SelectionType from './SelectionType.js'

export class inputCommandPicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 'picker' + 1,
            parentCh: 1,
            type: {
                label: 'Note Off',
                value: 1
            },
            command: 0,
            channel: 11,
            sysex: 'Enter HEX data here',
            selectedIns: 0x01,
            selectedCh: 256,
            noteType: 'Specific',
            note: {
                label: 'Select A Note',
                value: 129
            },
            pgmType: 'Specific',
            program: {
                label: 'Select A Program',
                value: 129
            },
            ccType: 'Specific',
            cc: {
                label: 'Select A Controller',
                value: 129
            },
            velType: 'Any',
            valType: 'Any',
            value: {
                label: 'Select A Value',
                value: 129
            },
            pbValType: 'Specific',
            songType: 'Specific',
            song: {
                label: 'Select A Song',
                value: 129
            },
            pbVal: 8192
        }

        this.channelSelect = this.channelSelect.bind(this)

    }

    getChannels = (channels) => {
        this.setState({ selectedCh: channels })
    }

    typeSelection = (type, data) => {
        if (type === 'Velocity') {
            this.setState({ velType: data })
        } else if (type === 'Note') {
            this.setState({ noteType: data })
        } else if (type === 'ControlChange') {
            this.setState({ ccType: data })
        } else if (type === 'Value') {
            this.setState({ valType: data })
        } else if (type === 'Program') {
            this.setState({ pgmType: data })
        } else if (type === 'Song') {
            this.setState({ songType: data })
        } else if (type === 'PitchBend') {
            this.setState({ pbValType: data })
        }

    }


    channelSelect = () => {
        return (
            < tr >
                <td>
                    <b>CH:</b>
                </td>
                <td>
                    <ChannelSelect sendData={this.getChannels} data={this.state.selectedCh} />
                </td>
            </tr >
        )
    }

    handleInSelData = (theData) => {
        this.setState({ selectedIns: theData })
    }

    handleNoteChange = (theData) => {
        this.setState({ note: theData })
    }

    handlePgmChange = (theData) => {
        this.setState({ program: theData })
    }

    handleCcChange = (theData) => {
        this.setState({ cc: theData })
    }

    handleValueChange = (theData) => {
        this.setState({ value: theData })
    }

    handleSongChange = (theData) => {
        this.setState({ song: theData })
    }

    handleRangeChange = (e) => {
        var tempName = e.target.name
        if (tempName === 'PitchBend') {
            this.setState({ pbVal: e.target.value })
        } else if (tempName === 'PitchBendBox') {
            this.setState({ pbVal: parseInt(e.target.value) + 8192 })
        }
    }

    inputSelect = () => {
        return (
            < tr >
                <td>
                    <b>Input:</b>
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
        let xyz = []
        if (this.state.noteType === 'Specific') {
            xyz.push(
                <Select
                    name='noteSelector'
                    styles={selectStyle}
                    hideResetButton='true'
                    style={{ textAlign: 'left' }}
                    options={noteDropDown()}
                    value={this.state.note}
                    theme="default"
                    onChange={(e) => { this.handleNoteChange(e) }}
                />
            )
        } else if (this.state.noteType === 'Multiple') {
            xyz.push(
                <b>Multi Select</b>
            )
        } else if (this.state.noteType === 'Range') {
            xyz.push(
                <input
                    type="range"
                    style={{
                        width: '100%',
                    }}
                />
            )
        } else if (this.state.noteType === 'Any') {
            //NOTHING
        } else {
            xyz.push(
                <b>ERROR</b>
            )
        }

        return (
            < tr >
                <td>
                    <b>Note:</b>
                </td>
                <td>
                    <SelectionType type="Note" data={this.state.noteType} sendData={this.typeSelection} />
                    {xyz}
                </td>
            </tr >
        )
    }

    ccSelect = () => {
        let body = []

        if (this.state.ccType === 'Specific') {
            body.push(
                <Select
                    name='noteSelector'
                    styles={selectStyle}
                    hideResetButton='true'
                    style={{ textAlign: 'left' }}
                    options={ccDropDown()}
                    value={this.state.cc}
                    theme="default"
                    onChange={(e) => { this.handleCcChange(e) }}
                />
            )
        }


        return (
            < tr >
                <td>
                    <b>CC#:</b>
                </td>
                <td>
                    <SelectionType type="ControlChange" data={this.state.ccType} sendData={this.typeSelection} />
                    {body}
                </td>
            </tr >
        )
    }

    pgmSelect = () => {
        let pgm = []
        pgm.push(
            <Select
                name='typeSelector'
                styles={selectStyle}
                hideResetButton='true'
                style={{ textAlign: 'left' }}
                options={one127()}
                value={this.state.program}
                theme="default"
                onChange={(e) => { this.handlePgmChange(e) }}
            />
        )
        return (
            < tr >
                <td>
                    <b>PGM#:</b>
                </td>
                <td>
                    <SelectionType type="Program" data={this.state.pgmType} sendData={this.typeSelection} />
                    {pgm}
                </td>
            </tr >
        )
    }

    sysexData = () => {
        return (
            < tr >
                <td>
                    <b>DATA:</b>
                </td>
                <td>
                    Enter Sys Ex Data
                </td>
            </tr >
        )
    }

    songSelect = () => {
        let song=[]
        song.push(
            <Select
                name='songSelector'
                styles={selectStyle}
                hideResetButton='true'
                style={{ textAlign: 'left' }}
                options={one127()}
                value={this.state.song}
                theme="default"
                onChange={(e) => { this.handleSongChange(e) }}
            />
        )
        return (
            < tr >
                <td>
                    <b>Song:</b>
                </td>
                <td>
                    <SelectionType type="Song" data={this.state.songType} sendData={this.typeSelection} />
                    {song}
                </td>
            </tr >
        )
    }

    velSelect = () => {
        return (
            < tr >
                <td>
                    <b>Vel:</b>
                </td>
                <td>
                    <SelectionType type="Velocity" data={this.state.velType} sendData={this.typeSelection} />
                </td>
            </tr >
        )
    }

    pitchBendSelect = () => {
        let abc = []
        if (this.state.pbValType === 'Specific') {
            abc.push(
                <Fragment>
                    <input
                        name='PitchBend'
                        type="range"
                        min="0"
                        max="16383"
                        value={this.state.pbVal}
                        onChange={this.handleRangeChange}
                        style={{
                            width: '100%',
                        }}
                    />
                    <input
                        name='PitchBendBox'
                        type="number"
                        min="-8192"
                        max="8191"
                        value={this.state.pbVal - 8192}
                        onChange={this.handleRangeChange}
                        style={{
                            textAlign: 'center'
                        }}
                    />
                </Fragment>
            )
        } else if (this.state.pbValType === 'Multiple') {
            abc.push(
                <b>Multi Select</b>
            )
        } else if (this.state.pbValType === 'Range') {
            abc.push(
                <Fragment>
                    <input
                        name='PitchBend'
                        type="range"
                        min="0"
                        max="16383"
                        value={this.state.pbVal}
                        onChange={this.handleRangeChange}
                        style={{
                            width: '100%',
                        }}
                    />
                    <input
                        name='PitchBendBox'
                        type="number"
                        min="-8192"
                        max="8191"
                        value={this.state.pbVal - 8192}
                        onChange={this.handleRangeChange}
                        style={{
                            textAlign: 'center'
                        }}
                    />
                </Fragment>
            )
        } else if (this.state.pbValType === 'Any') {
            //NOTHING
        } else {
            abc.push(
                <b>ERROR</b>
            )
        }


        return (
            < tr >
                <td>
                    <b>Val:</b>
                </td>
                <td>
                    <SelectionType type="PitchBend" data={this.state.pbValType} sendData={this.typeSelection} />
                    {abc}
                </td>
            </tr >
        )
    }

    valSelect = () => {
        let value = []
        value.push(
            <Select
                name='valueSelector'
                styles={selectStyle}
                hideResetButton='true'
                style={{ textAlign: 'left' }}
                options={one127()}
                value={this.state.value}
                theme="default"
                onChange={(e) => { this.handleValueChange(e) }}
            />
        )
        return (
            < tr >
                <td>
                    <b>Val:</b>
                </td>
                <td>
                    <SelectionType type="Value" data={this.state.valType} sendData={this.typeSelection} />
                    {value}
                </td>
            </tr >
        )
    }

    handleTypeChange = (theData) => {
        this.setState({ type: theData })
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
        let spacer = []

        const horizontalSpacer = (<tr><td colSpan="2"><hr /></td></tr>)

        if (this.state.type.label !== 'None') {
            spacer.push(horizontalSpacer)
            underType.push(
                this.inputSelect(),
            )
        }

        switch (this.state.type.label) {
            case 'None':
                break

            case 'Note On':
                underType.push(
                    horizontalSpacer,
                    this.channelSelect(),
                    horizontalSpacer,
                    this.noteSelect(),
                    horizontalSpacer,
                    this.velSelect()
                )
                break

            case 'Note Off':
                underType.push(
                    horizontalSpacer,
                    this.channelSelect(),
                    horizontalSpacer,
                    this.noteSelect(),
                    horizontalSpacer,
                    this.velSelect()
                )
                break

            case 'Control Change':
                underType.push(
                    horizontalSpacer,
                    this.channelSelect(),
                    horizontalSpacer,
                    this.ccSelect(),
                    horizontalSpacer,
                    this.valSelect()
                )
                break

            case 'Program Change':
                underType.push(
                    horizontalSpacer,
                    this.channelSelect(),
                    horizontalSpacer,
                    this.pgmSelect()
                )
                break

            case 'Pitch Bend':
                underType.push(
                    horizontalSpacer,
                    this.channelSelect(),
                    horizontalSpacer,
                    this.pitchBendSelect()
                )
                break

            case 'Sys Ex':
                underType.push(
                    horizontalSpacer,
                    this.sysexData()
                )
                break

            case 'Song Select':
                underType.push(
                    horizontalSpacer,
                    this.songSelect()
                )
                break

            default:
        }


        return (
            <div className="pickerTopDiv" style={mainDiv}>
                <button onMouseDown={this.printState}>STATE</button>
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
                        {horizontalSpacer}
                        <tr>
                            <td>
                                <div id="typeLbl" style={label}><b>Type:</b></div>
                            </td>
                            <td>
                                <div id="typeDiv">
                                    <Select
                                        name='typeSelector'
                                        styles={selectStyle}
                                        hideResetButton='true'
                                        style={{ textAlign: 'left' }}
                                        options={inputTypesDropDown()}
                                        value={this.state.type}
                                        theme="default"
                                        onChange={(e) => { this.handleTypeChange(e) }}
                                    />
                                </div>
                            </td>
                        </tr>
                        {spacer}
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
