import React, { Fragment, useState, useEffect } from 'react'
import Select from 'react-select'
import InputSelect from '../IOSelect'
import {
    inputTypesDropDown,
    one127,
    noteDropDown,
    ccDropDown,
    numberOfInputs
} from './outMidiTables'
import ChannelSelect from '../ChannelSelect'
import SysExInput from '../SysExInput'
import MTCinput from '../MTCinput'

export default function OutputCommandPicker(props) {
    let defaultState = {
        id: 'picker' + 1,
        parentCh: 1,
        type: {
            label: 'None',
            value: 0
        },
        selectedOuts: 0x01,
        selectedCh: 256,
        channel: 11,
        note: {
            label: 'Select A Note',
            value: 129
        },
        cc: {
            label: 'Select A Controller',
            value: 129
        },
        program: {
            label: 'Select A Program',
            value: 129
        },
        velocity: {
            label: 'Select A Velocity',
            value: 129
        },
        value: {
            label: 'Select A Value',
            value: 129
        },
        pbVal: 8192,
        song: {
            label: 'Select A Song',
            value: 129
        },
        mtc: {
            rate: '29.97fps',
            hour: '00',
            min: '00',
            sec: '00',
            frame: '00',
        },
        sysexText: 'Enter Sysex Data',
        sysex: 'Enter HEX data here'
    }

    /////
    if (props.data.pickerData.type) {
        //Merge shrunk picker data with defaultState
        defaultState = Object.assign(defaultState, props.data.pickerData)
        //defaultState = props.data.pickerData
    }

    const [state, setstate] = useState(defaultState)

    useEffect(() => {
        //console.log('State Changed')
        props.sendData(props.id, shrinkPicker())
    }, [state])

    const shrinkPicker = () => {
        let shrunkState = {}

        shrunkState.id = state.id
        shrunkState.parentCh = state.parentCh
        shrunkState.type = state.type

        switch (state.type.label) {
            case 'None':
                break;

            case 'Note Off' || 'Note On':
                shrunkState.selectedOuts = state.selectedOuts
                shrunkState.selectedCh = state.selectedCh
                shrunkState.channel = state.channel
                shrunkState.note = state.note
                shrunkState.velocity = state.velocity
                break;

            case 'Control Change':
                shrunkState.selectedOuts = state.selectedOuts
                shrunkState.selectedCh = state.selectedCh
                shrunkState.channel = state.channel
                shrunkState.cc = state.cc
                shrunkState.value = state.value

                break;

            case 'Program Change':
                shrunkState.selectedOuts = state.selectedOuts
                shrunkState.selectedCh = state.selectedCh
                shrunkState.channel = state.channel
                shrunkState.program = state.program
                break;

            case 'Pitch Bend':
                shrunkState.selectedOuts = state.selectedOuts
                shrunkState.selectedCh = state.selectedCh
                shrunkState.channel = state.channel
                shrunkState.pbVal = state.pbVal
                break;

            case 'Sys Ex':
                shrunkState.selectedOuts = state.selectedOuts
                shrunkState.sysexText = state.sysexText
                shrunkState.sysex = state.sysex
                break;

            case 'MTC':
                shrunkState.selectedOuts = state.selectedOuts
                shrunkState.mtc = state.mtc
                break;

            case 'Song Select':
                shrunkState.selectedOuts = state.selectedOuts
                shrunkState.song = state.song
                break;

            case 'Start' || 'Stop' || 'Continue' || 'System Reset':
                shrunkState.selectedOuts = state.selectedOuts
                break;

            default:
                return state
        }
        console.log(shrunkState)
        return shrunkState
    }

    const getChannels = (channels) => {
        let tempState = { ...state }
        tempState.selectedCh = channels
        setstate(tempState)
    }

    const channelSelect = () => {
        return (
            < tr key={'channelSelect' + props.channel} >
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
        //console.log(hour + ':' + min + ':' + sec + ':' + frm + ' ' + rate)

        let tempState = { ...state }
        tempState.mtc.rate = rate
        tempState.mtc.hour = hour
        tempState.mtc.min = min
        tempState.mtc.sec = sec
        tempState.mtc.frame = frm
        if (tempState.mtc !== state.mtc) {
            setstate(tempState)
        }
    }

    const handleInSelData = (theData) => {
        let tempState = { ...state }
        tempState.selectedOuts = theData
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

    const handleVelocityChange = (theData) => {
        let tempState = { ...state }
        tempState.velocity = theData
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

    const outputSelect = () => {
        return (
            < tr key={"outputSelcet" + props.id} >
                <td>
                    <b style={label}>Output:</b>
                </td>
                <td>
                    <InputSelect
                        data={{
                            ins: numberOfInputs,
                            selection: state.selectedOuts
                        }}
                        sendData={handleInSelData}
                    />
                </td>
            </tr >
        )
    }

    const noteSelect = () => {
        return (
            < tr key={'noteSelectOutput' + props.channel} >
                <td>
                    <b style={label}>Note:</b>
                </td>
                <td>
                    <Select
                        key={'noteSelection' + props.channel}
                        name='noteSelector'
                        styles={selectStyle}
                        hideResetButton='true'
                        style={{ textAlign: 'left' }}
                        options={noteDropDown()}
                        value={state.note}
                        theme="default"
                        onChange={(e) => { handleNoteChange(e) }}
                    />
                </td>
            </tr >
        )
    }

    const ccSelect = () => {
        return (
            < tr key={'ccSelector' + props.channel}>
                <td>
                    <b style={label}>CC#:</b>
                </td>
                <td>
                    <Select
                        key={'ccSpecificTypeSelect' + props.channel}
                        name='noteSelector'
                        styles={selectStyle}
                        hideResetButton='true'
                        style={{ textAlign: 'left' }}
                        options={ccDropDown()}
                        value={state.cc}
                        theme="default"
                        onChange={(e) => { handleCcChange(e) }}
                    />
                </td>
            </tr >
        )
    }

    const pgmSelect = () => {
        let pgm = []
        pgm.push(
            <Select
                key={'pgmSelector' + props.channel}
                name='pgmSelector'
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
            < tr key={'pgmSelectorOut' + props.channel}>
                <td>
                    <b style={label}>PGM#:</b>
                </td>
                <td>
                    {pgm}
                </td>
            </tr >
        )
    }

    const mtcSelect = () => {
        return (
            < tr key={'mtcSelector' + props.channel}>
                <td>
                    <b style={label}>Time:</b>
                </td>
                <td>
                    <MTCinput sendMtc={handleMtc} data={state.mtc} />
                </td>
            </tr >
        )
    }

    const sysexData = () => {
        return (
            < tr key={'sysexDataInput' + props.id} >
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
                key={'songSelector' + props.channel}
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
            < tr key={'songSelectorOut' + props.channel}>
                <td>
                    <b style={label}>Song:</b>
                </td>
                <td>
                    {song}
                </td>
            </tr >
        )
    }

    const velSelect = () => {
        let velocity = []
        velocity.push(
            <Select
                key={'velocitySelest' + props.channel}
                name='velocitySelector'
                styles={selectStyle}
                hideResetButton='true'
                style={{ textAlign: 'left' }}
                options={one127()}
                value={state.velocity}
                theme="default"
                onChange={(e) => { handleVelocityChange(e) }}
            />
        )
        return (
            < tr key={'velocityInput' + props.channel}>
                <td>
                    <b style={label}>Vel:</b>
                </td>
                <td>
                    {velocity}
                </td>
            </tr >
        )
    }

    const pitchBendSelect = () => {
        return (
            < tr key={'pitchBendInput' + props.channel}>
                <td>
                    <b style={label}>Val:</b>
                </td>
                <td>
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
                </td>
            </tr >
        )
    }

    const valSelect = () => {
        let value = []
        value.push(
            <Select
                key={'valueSelest' + props.channel}
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
            < tr key={'valueSelector' + props.channel} >
                <td>
                    <b style={label}>Val:</b>
                </td>
                <td>
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
            outputSelect(),
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
                            Output Command Picker v2
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
}

const label = {
    textAlign: 'right',
    paddingLeft: '5px',
    fontSize: '12px',
}
//////////////////////////////////////////// Style //
