import React, { useState, useEffect, Fragment } from 'react'
import Select from 'react-select'
import Slider, { Range } from 'rc-slider';

import 'rc-slider/assets/index.css';

const { ipcRenderer } = window.require('electron')

export default function MidiLightLED(props) {
    let allTypes = ['Solid', 'Flash', 'Blink', 'Breath']
    let typesDropDown = []
    createOptions(allTypes, typesDropDown)

    const defaultState = {
        name: props.name,
        channel: props.channel,
        color: [200, 100, 50], //HSL
        type: {
            label: 'Solid',
            value: 0
        },
        sliderval: 20
    }

    const [state, setstate] = useState(defaultState)

    useEffect(() => {
        ipcRenderer.on('colorFromPicker', (event, rgb, chnl, HSL) => {

            if (chnl === state.channel) {

                let tempState = { ...state }
                tempState.color = [parseInt(HSL[0]), HSL[1], HSL[2]]
                setstate(tempState)
                //this.setState({ color: [parseInt(HSL[0]), HSL[1], HSL[2]] });

                if (props.getStructure !== undefined) {
                    let tempGetColor = state
                    tempGetColor.color = [parseInt(HSL[0]), HSL[1], HSL[2]]

                    props.getStructure(state.parentCh, tempGetColor)
                }

            }
        })
        return () => {
            //cleanup
        }
    }, [])

    useEffect(() => {
        if (props.getStructure !== undefined) {
            props.getStructure(state.parentCh, state)
        }
    }, [state])

    const clrPckr = (e) => {
        if (e.buttons === 1) {
            ipcRenderer.send('showColorPicker', state.channel, state.name, state.color)
        } else if (e.buttons === 2) {
            console.log('Right Click')
        }

    }

    const aSlider = (val) => {
        return (
            <table key="aSlider" style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td style={label}>
                            Val
                        </td>
                        <td style={{
                            width: '100%',
                            padding: "0px 12px"
                        }}>
                            <div>
                                <Slider />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    const typeChange = (e) => {
        let tempState = { ...state }
        tempState.type = e
        setstate(tempState)
    }

    const slot = (lable, userInterface) => {
        return (
            <tr>
                <td style={label}><b>{lable}</b></td>
                <td style={td}>
                    {userInterface}
                </td>
            </tr>
        )
    }

    const horizontalLine = () => {
        return (
            <tr>
                <td colSpan="2"><hr /></td>
            </tr>
        )
    }

    const slots = () => {
        switch (state.type.label) {
            case 'Solid':
                return (
                    <Fragment>
                        {horizontalLine()}
                        {slot('Rise:', aSlider())}
                        {horizontalLine()}
                        {slot('Fall:', aSlider())}
                    </Fragment>
                )

            case 'Flash':
                return (
                    <Fragment>
                        {horizontalLine()}
                        {slot('Drtn:', aSlider())}
                        {horizontalLine()}
                        {slot('Rise:', aSlider())}
                        {horizontalLine()}
                        {slot('Fall:', aSlider())}
                    </Fragment>
                )

            case 'Blink':
                return (
                    <Fragment>
                        {horizontalLine()}
                        {slot('Freq:', aSlider())}
                        {horizontalLine()}
                        {slot('Len:', aSlider())}
                        {horizontalLine()}
                        {slot('Fall:', aSlider())}
                    </Fragment>
                )

            case 'Breath':
                return (
                    <Fragment>
                        {horizontalLine()}
                        {slot('Freq:', aSlider())}
                        {horizontalLine()}
                        {slot('Low:', aSlider())}
                    </Fragment>
                )

            default:
                return;
        }

    }


    function createOptions(pointer, output) {
        for (const [value, label] of pointer.entries()) {
            output.push({ label, value })
        }

        for (var i = 0; i < output.length; i++) {
            output[i].label = String(output[i].label)
        }
    }

    return (
        <div style={mainDiv}>
            <div style={{ userSelect: 'none' }}>LED Options v2</div>
            <hr/>
            <table style={{ width: '100%' }}>
                <colgroup>
                    <col width="1px" />
                </colgroup>
                <tbody>
                    <tr>
                    <td style={td}>
                            <div style={{ userSelect: 'none' }}><b>Color:</b></div>
                        </td>
                        <td style={dotCell} onMouseDown={clrPckr}>
                            <span style={{
                                height: '20px',
                                width: '90%',
                                backgroundColor: 'hsl(' +
                                    state.color[0] + ',' +
                                    state.color[1] + '%,' +
                                    state.color[2] + '%' +
                                    ')',
                                borderRadius: '5px',
                                display: 'inline-block',
                                margin: '2px 0px',
                                verticalAlign: "middle",
                                boxShadow: 'inset 1px 1px 1px'
                            }}></span>
                        </td>
                        
                    </tr>
                    {horizontalLine()}
                    <tr>
                        <td style={label}><b>Style:</b></td>
                        <td style={td}>
                            <div>
                                <Select
                                    styles={styles}
                                    options={typesDropDown}
                                    value={state.type}
                                    onChange={(e) => {
                                        typeChange(e)
                                    }}
                                />
                            </div>
                        </td>
                    </tr>
                    {slots()}
                </tbody>
            </table>
        </div>
    )
}



//STYLE///////////////////////////////////////////////
const td = {
    //border: '1px black solid'
}

const dotCell = {
    alignContents: 'center',
}

const label = {
    textAlign: 'right',
    paddingLeft: '5px',
    fontSize: '12px',
    userSelect: 'none'
}

const mainDiv = {
    backgroundColor: 'lightgrey',
    padding: '8px',
    maxWidth: '500px',
    borderRadius: '10px',
    margin: '4px',
    fontSize: '12px',
    border: '1px solid grey',
    boxShadow: 'inset 1px 1px 6px'
}

const styles = {
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
///////////////////////////////////////////////STYLE//