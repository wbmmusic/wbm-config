import React, { useEffect, Fragment, useContext, useState } from 'react'
import Select from 'react-select'
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import ColorPicker from '../utilities/pickers/ColorPicker';
import { defaultSliderStyle } from '../../Styles/SliderStyle';

const { ipcRenderer } = window.require('electron')

export default function MidiLightLED(props) {
    let allTypes = ['Solid', 'Flash', 'Blink', 'Breathe']
    let typesDropDown = []
    createOptions(allTypes, typesDropDown)

    const [channel, setChannel] = useContext(props.context)
    const [showColorPicker, setshowColorPicker] = useState(false)

    const doDis = (event, rgb, chnl, HSL) => {

        if (chnl === props.channel) {
            console.log('COLOR')
            let tempChannel = { ...channel }
            tempChannel.ledData.color = [parseInt(HSL[0]), HSL[1], HSL[2]]
            console.log(tempChannel)
            setChannel(tempChannel)
        }
    }

    useEffect(() => {
        ipcRenderer.on('colorFromPicker', (event, rgb, chnl, HSL) => doDis(event, rgb, chnl, HSL))
        return () => {
            ipcRenderer.removeListener('colorFromPicker', doDis)
        }
    }, [])

    const clrPckr = (e) => {
        setshowColorPicker(true)
    }

    const sliderChange = (name, value) => {
        let tempChannel = { ...channel }
        switch (name) {
            case 'Rise':
                tempChannel.ledData.rise = value
                setChannel(tempChannel)
                break;

            case 'Fall':
                tempChannel.ledData.fall = value
                setChannel(tempChannel)
                break;

            case 'Drtn':
                tempChannel.ledData.drtn = value
                setChannel(tempChannel)
                break;

            case 'Len':
                tempChannel.ledData.len = value
                setChannel(tempChannel)
                break;

            case 'Freq':
                tempChannel.ledData.freq = value
                setChannel(tempChannel)
                break;

            case 'Low':
                tempChannel.ledData.low = value
                setChannel(tempChannel)
                break;

            default:
                break;
        }
    }

    const aSlider = (sliderType) => {
        let thisVal
        switch (sliderType) {
            case 'Rise':
                thisVal = channel.ledData.rise
                break;

            case 'Fall':
                thisVal = channel.ledData.fall
                break;

            case 'Drtn':
                thisVal = channel.ledData.drtn
                break;

            case 'Len':
                thisVal = channel.ledData.len
                break;

            case 'Freq':
                thisVal = channel.ledData.freq
                break;

            case 'Low':
                thisVal = channel.ledData.low
                break;

            default:
                break;
        }
        return (
            <table key={sliderType + 'SliderCh' + props.channel} style={{ width: '100%' }}>
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
                                <Slider
                                    {...defaultSliderStyle}
                                    value={thisVal}
                                    onChange={(e) => sliderChange(sliderType, e)}
                                />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    const typeChange = (e) => {
        let tempChannel = { ...channel }
        tempChannel.ledData.type = e
        setChannel(tempChannel)
    }

    const slot = (lable, userInterface) => {
        return (
            <tr>
                <td style={label}><b>{lable}</b></td>
                <td>
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

    const stylePicker = () => {
        return (
            <tr>
                <td style={label}><b>Style:</b></td>
                <td>
                    <div>
                        <Select
                            styles={styles}
                            options={typesDropDown}
                            value={channel.ledData.type}
                            onChange={(e) => {
                                typeChange(e)
                            }}
                        />
                    </div>
                </td>
            </tr>
        )
    }

    const slots = () => {
        if (showColorPicker) {
            return (
                <tr>
                    <td colSpan="2">
                        <ColorPicker close={() => setshowColorPicker(false)} context={props.context} />
                    </td>
                </tr>
            )
        } else {
            switch (channel.ledData.type.label) {
                case 'Solid':
                    return (
                        <Fragment>
                            {stylePicker()}
                            {horizontalLine()}
                            {slot('Rise:', aSlider('Rise'))}
                            {horizontalLine()}
                            {slot('Fall:', aSlider('Fall'))}
                        </Fragment>
                    )

                case 'Flash':
                    return (
                        <Fragment>
                            {stylePicker()}
                            {horizontalLine()}
                            {slot('Drtn:', aSlider('Drtn'))}
                            {horizontalLine()}
                            {slot('Rise:', aSlider('Rise'))}
                            {horizontalLine()}
                            {slot('Fall:', aSlider('Fall'))}
                        </Fragment>
                    )

                case 'Blink':
                    return (
                        <Fragment>
                            {stylePicker()}
                            {horizontalLine()}
                            {slot('Freq:', aSlider('Freq'))}
                            {horizontalLine()}
                            {slot('Len:', aSlider('Len'))}
                            {horizontalLine()}
                            {slot('Fall:', aSlider('Fall'))}
                        </Fragment>
                    )

                case 'Breathe':
                    return (
                        <Fragment>
                            {stylePicker()}
                            {horizontalLine()}
                            {slot('Freq:', aSlider('Freq'))}
                            {horizontalLine()}
                            {slot('Low:', aSlider('Low'))}
                        </Fragment>
                    )

                default:
                    return;
            }
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
        <div className="insetui">
            <div>LED Options</div>
            <hr />
            <table style={{ width: '100%' }}>
                <colgroup>
                    <col width="1px" />
                </colgroup>
                <tbody>
                    <tr>
                        <td>
                            <div><b>Color:</b></div>
                        </td>
                        <td style={dotCell} onMouseDown={clrPckr}>
                            <span style={{
                                height: '20px',
                                width: '100%',
                                backgroundColor: 'hsl(' +
                                    channel.ledData.color[0] + ',' +
                                    channel.ledData.color[1] + '%,' +
                                    channel.ledData.color[2] + '%' +
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
                    {slots()}
                </tbody>
            </table>
        </div>
    )
}


//STYLE///////////////////////////////////////////////
const dotCell = {
    alignContents: 'center',
}

const label = {
    textAlign: 'right',
    paddingLeft: '5px',
    fontSize: '12px',
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