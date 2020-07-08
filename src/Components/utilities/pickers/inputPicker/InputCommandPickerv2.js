import React, { Fragment, useState, useEffect } from 'react'
import Select from 'react-select'
import InputSelect from '../IOSelect'
import {
    inputTypesDropDown,
    one127,
    noteDropDown,
    ccDropDown,
    numberOfInputs
} from '../inputPicker/inMidiTables'
import ChannelSelect from '../ChannelSelect'
import SelectionType from '../SelectionType'
import SysExInput from '../SysExInput'
import MTCinput from '../MTCinput'

const defaultState = {
    id: 'picker' + 1,
    parentCh: 1,
    type: {
        label: 'None',
        value: 0
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
    pbVal: 8192,
    sysexText: 'Enter Sysex Data'
}

export default function InputCommandPickerv2(props) {

    const [state, setstate] = useState(defaultState)

    useEffect(() => {
        console.log('State Changed')
        return () => {
            //cleanup
        }
    }, [state])

    const getChannels = (channels) => {
        let tempState = { ...state }
        tempState.selectedCh = channels
        setstate(tempState)
    }

    const typeSelection = (type, data) => {
        //console.log(data)
        if (type === 'Velocity') {
            let tempState = { ...state }
            tempState.velType = data
            setstate(tempState)
        } else if (type === 'Note') {
            let tempState = { ...state }
            tempState.noteType = data
            setstate(tempState)
        } else if (type === 'ControlChange') {
            let tempState = { ...state }
            tempState.ccType = data
            setstate(tempState)
        } else if (type === 'Value') {
            let tempState = { ...state }
            tempState.valType = data
            setstate(tempState)
        } else if (type === 'Program') {
            let tempState = { ...state }
            tempState.pgmType = data
            setstate(tempState)
        } else if (type === 'Song') {
            let tempState = { ...state }
            tempState.songType = data
            setstate(tempState)
        } else if (type === 'PitchBend') {
            let tempState = { ...state }
            tempState.pbValType = data
            setstate(tempState)
        }

    }

    const channelSelect = () => {
        return (
            < tr >
                <td>
                    <b style={label}>CH:</b>
                </td>
                <td>
                    <ChannelSelect sendData={getChannels} data={state.selectedCh} />
                </td>
            </tr >
        )
    }

    const handleMtc = (rate, hour, min, sec, frm) => {
        console.log(hour + ':' + min + ':' + sec + ':' + frm + ' ' + rate)
    }

    const handleInSelData = (theData) => {
        let tempState = { ...state }
        tempState.selectedIns = theData
        setstate(tempState)
    }

    const handleNoteChange = (theData) => {
        let tempState = { ...state }
        tempState.note = theData
        setstate(tempState)
    }

    const handlePgmChange = (theData) => {
        let tempState = { ...state }
        tempState.program = theData
        setstate(tempState)
    }

    const handleCcChange = (theData) => {
        let tempState = { ...state }
        tempState.cc = theData
        setstate(tempState)
    }

    const handleValueChange = (theData) => {
        let tempState = { ...state }
        tempState.value = theData
        setstate(tempState)
    }

    const handleSongChange = (theData) => {
        let tempState = { ...state }
        tempState.song = theData
        setstate(tempState)
    }

    const handleRangeChange = (e) => {
        var tempName = e.target.name
        if (tempName === 'PitchBend') {
            let tempState = { ...state }
            tempState.pbVal = e.target.value
            setstate(tempState)
        } else if (tempName === 'PitchBendBox') {
            let tempState = { ...state }
            tempState.pbVal = parseInt(e.target.value) + 8192
            setstate(tempState)
        }
    }

    const inputSelect = () => {
        return (
            < tr >
                <td>
                    <b style={label}>Input:</b>
                </td>
                <td>
                    <InputSelect
                        data={{
                            ins: numberOfInputs,
                            selection: state.selectedIns
                        }}
                        sendData={handleInSelData}
                    />
                </td>
            </tr >
        )
    }

    const noteSelect = () => {
        let xyz = []
        if (state.noteType === 'Specific') {
            xyz.push(
                <Select
                    name='noteSelector'
                    styles={selectStyle}
                    hideResetButton='true'
                    style={{ textAlign: 'left' }}
                    options={noteDropDown()}
                    value={state.note}
                    theme="default"
                    onChange={(e) => { handleNoteChange(e) }}
                />
            )
        } else if (state.noteType === 'Multiple') {
            xyz.push(
                <b>Multi Select</b>
            )
        } else if (state.noteType === 'Range') {
            xyz.push(
                <input
                    type="range"
                    style={{
                        width: '100%',
                    }}
                />
            )
        } else if (state.noteType === 'Any') {
            //NOTHING
        } else {
            xyz.push(
                <b>ERROR</b>
            )
        }

        return (
            < tr >
                <td>
                    <b style={label}>Note:</b>
                </td>
                <td>
                    <SelectionType type="Note" data={state.noteType} sendData={typeSelection} />
                    {xyz}
                </td>
            </tr >
        )
    }

    const ccSelect = () => {
        let body = []

        if (state.ccType === 'Specific') {
            body.push(
                <Select
                    name='noteSelector'
                    styles={selectStyle}
                    hideResetButton='true'
                    style={{ textAlign: 'left' }}
                    options={ccDropDown()}
                    value={state.cc}
                    theme="default"
                    onChange={(e) => { handleCcChange(e) }}
                />
            )
        }


        return (
            < tr >
                <td>
                    <b style={label}>CC#:</b>
                </td>
                <td>
                    <SelectionType type="ControlChange" data={state.ccType} sendData={typeSelection} />
                    {body}
                </td>
            </tr >
        )
    }

    const pgmSelect = () => {
        let pgm = []
        pgm.push(
            <Select
                name='typeSelector'
                styles={selectStyle}
                hideResetButton='true'
                style={{ textAlign: 'left' }}
                options={one127()}
                value={state.program}
                theme="default"
                onChange={(e) => { handlePgmChange(e) }}
            />
        )
        return (
            < tr >
                <td>
                    <b style={label}>PGM#:</b>
                </td>
                <td>
                    <SelectionType type="Program" data={state.pgmType} sendData={typeSelection} />
                    {pgm}
                </td>
            </tr >
        )
    }

    const mtcSelect = () => {
        return (
            < tr >
                <td>
                    <b style={label}>Time:</b>
                </td>
                <td>
                    <MTCinput sendMtc={handleMtc} />
                </td>
            </tr >
        )
    }

    const sysexData = () => {
        return (
            < tr >
                <td>
                    <b style={label}>DATA:</b>
                </td>
                <td>
                    <SysExInput text={state.sysexText} />
                </td>
            </tr >
        )
    }

    const songSelect = () => {
        let song = []
        song.push(
            <Select
                name='songSelector'
                styles={selectStyle}
                hideResetButton='true'
                style={{ textAlign: 'left' }}
                options={one127()}
                value={state.song}
                theme="default"
                onChange={(e) => { handleSongChange(e) }}
            />
        )
        return (
            < tr >
                <td>
                    <b style={label}>Song:</b>
                </td>
                <td>
                    <SelectionType type="Song" data={state.songType} sendData={typeSelection} />
                    {song}
                </td>
            </tr >
        )
    }

    const velSelect = () => {
        return (
            < tr >
                <td>
                    <b style={label}>Vel:</b>
                </td>
                <td>
                    <SelectionType type="Velocity" data={state.velType} sendData={typeSelection} />
                </td>
            </tr >
        )
    }

    const pitchBendSelect = () => {
        let abc = []
        if (state.pbValType === 'Specific') {
            abc.push(
                <Fragment>
                    <input
                        name='PitchBend'
                        type="range"
                        min="0"
                        max="16383"
                        value={state.pbVal}
                        onChange={handleRangeChange}
                        style={{
                            width: '100%',
                        }}
                    />
                    <input
                        name='PitchBendBox'
                        type="number"
                        min="-8192"
                        max="8191"
                        value={state.pbVal - 8192}
                        onChange={handleRangeChange}
                        style={{
                            textAlign: 'center'
                        }}
                    />
                </Fragment>
            )
        } else if (state.pbValType === 'Multiple') {
            abc.push(
                <b>Multi Select</b>
            )
        } else if (state.pbValType === 'Range') {
            abc.push(
                <Fragment>
                    <input
                        name='PitchBend'
                        type="range"
                        min="0"
                        max="16383"
                        value={state.pbVal}
                        onChange={handleRangeChange}
                        style={{
                            width: '100%',
                        }}
                    />
                    <input
                        name='PitchBendBox'
                        type="number"
                        min="-8192"
                        max="8191"
                        value={state.pbVal - 8192}
                        onChange={handleRangeChange}
                        style={{
                            textAlign: 'center'
                        }}
                    />
                </Fragment>
            )
        } else if (state.pbValType === 'Any') {
            //NOTHING
        } else {
            abc.push(
                <b>ERROR</b>
            )
        }


        return (
            < tr >
                <td>
                    <b style={label}>Val:</b>
                </td>
                <td>
                    <SelectionType type="PitchBend" data={state.pbValType} sendData={typeSelection} />
                    {abc}
                </td>
            </tr >
        )
    }

    const valSelect = () => {
        let value = []
        value.push(
            <Select
                name='valueSelector'
                styles={selectStyle}
                hideResetButton='true'
                style={{ textAlign: 'left' }}
                options={one127()}
                value={state.value}
                theme="default"
                onChange={(e) => { handleValueChange(e) }}
            />
        )
        return (
            < tr >
                <td>
                    <b style={label}>Val:</b>
                </td>
                <td>
                    <SelectionType type="Value" data={state.valType} sendData={typeSelection} />
                    {value}
                </td>
            </tr >
        )
    }

    const handleTypeChange = (theData) => {
        let tempState = { ...state }
        tempState.type = theData
        setstate(tempState)
    }

    const handleChannelChange = (e) => {
        //console.log(e)
        let tempState = { ...state }
        tempState.channel = e.value + 1
        setstate(tempState)
    }

    const printState = () => {
        console.log(state)
    }

    ///////////////////////////////////////////////////////////////////// RENDER

    let underType = 'Under Type'
    underType = []
    let spacer = []

    const horizontalSpacer = (<tr><td colSpan="2"><hr /></td></tr>)

    if (state.type.label !== 'None') {
        spacer.push(horizontalSpacer)
        underType.push(
            inputSelect(),
        )
    }
    switch (state.type.label) {

        case 'None':
            break

        case 'Note On':
            underType.push(
                horizontalSpacer,
                channelSelect(),
                horizontalSpacer,
                noteSelect(),
                horizontalSpacer,
                velSelect()
            )
            break

        case 'Note Off':
            underType.push(
                horizontalSpacer,
                channelSelect(),
                horizontalSpacer,
                noteSelect(),
                horizontalSpacer,
                velSelect()
            )
            break

        case 'Control Change':
            underType.push(
                horizontalSpacer,
                channelSelect(),
                horizontalSpacer,
                ccSelect(),
                horizontalSpacer,
                valSelect()
            )
            break

        case 'Program Change':
            underType.push(
                horizontalSpacer,
                channelSelect(),
                horizontalSpacer,
                pgmSelect()
            )
            break

        case 'Pitch Bend':
            underType.push(
                horizontalSpacer,
                channelSelect(),
                horizontalSpacer,
                pitchBendSelect()
            )
            break

        case 'Sys Ex':
            underType.push(
                horizontalSpacer,
                sysexData()
            )
            break

        case 'MTC':
            underType.push(
                horizontalSpacer,
                mtcSelect(),
            )
            break

        case 'Song Select':
            underType.push(
                horizontalSpacer,
                songSelect()
            )
            break

        default:
    }

    return (
        <div className="pickerTopDiv" style={mainDiv}>

            {/* <button onMouseDown={printState}>STATE</button> */}
            <table id={"pickerTable" + props.channel} style={{ width: "100%" }}>
                <colgroup>
                    <col width="1px" />
                </colgroup>
                <tbody>
                    <tr>
                        <td colSpan="2" style={pickerTitle}>
                            Input Command Picker v2
                            </td>
                    </tr>
                    {horizontalSpacer}
                    <tr>
                        <td>
                            <div id="typeLbl" style={label}><b style={label}>Type:</b></div>
                        </td>
                        <td>
                            <div id="typeDiv">
                                <Select
                                    name='typeSelector'
                                    styles={selectStyle}
                                    hideResetButton='true'
                                    style={{ textAlign: 'left' }}
                                    options={inputTypesDropDown()}
                                    value={state.type}
                                    theme="default"
                                    onChange={(e) => { handleTypeChange(e) }}
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
    userSelect: 'none'
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
    userSelect: 'none',
}
//////////////////////////////////////////// Style //
