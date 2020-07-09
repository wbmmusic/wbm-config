import React, { Component } from 'react'
import Select from 'react-select'
import Slider, { Range } from 'rc-slider';

import 'rc-slider/assets/index.css';

const { ipcRenderer } = window.require('electron')


export class midiLightLED extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.name,
            channel: this.props.channel,
            color: [200, 100, 50], //HSL
            type: {
                label: 'Solid',
                value: 0
            },
            slot1lbl: 'Rise:',
            slot2lbl: 'Fall:',
            slot3lbl: '',
            sliderval: 20
        }

        //console.log('LED ' + this.props.channel)
        this.clrPckr = this.clrPckr.bind(this)

        this.makeSlot2ui(this.state.sliderval)
    }

    makeSlot2ui = (val) => {
        slot2ui = [
            <table key="slot2ui" style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td style={label}>
                            Val
                        </td>
                        <td style={{
                            border: '1px solid black',
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
        ]
    }

    clrPckr = (e) => {
        if (e.buttons === 1) {
            ipcRenderer.send('showColorPicker', this.state.channel, this.state.name, this.state.color)
        } else if (e.buttons === 2) {
            console.log('Right Click')
        }

    }

    componentDidMount() {
        ipcRenderer.on('colorFromPicker', (event, rgb, chnl, HSL) => {

            if (chnl === this.state.channel) {

                this.setState({ color: [parseInt(HSL[0]), HSL[1], HSL[2]] });

                if (this.props.getStructure !== undefined) {
                    let tempGetColor = this.state
                    tempGetColor.color = [parseInt(HSL[0]), HSL[1], HSL[2]]

                    this.props.getStructure(this.state.parentCh, tempGetColor)
                }

            }
        })

        this.props.getStructure(this.state.channel, this.state)
    }

    componentDidUpdate() {
        if (this.state.name !== this.props.name) {
            this.setState({ name: this.props.name })
            console.log('LED NAME CHANGE')
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.statex !== prevState) {
            return nextProps.statex;
        }
        else return null;
    }

    typeChange(e) {
        this.setState({ type: e })
        let tempSetShowBytes = this.state
        tempSetShowBytes.type = e

        if (e.label === 'Solid') {
            this.setState((state) => {

                if (this.props.getStructure !== undefined) {
                    tempSetShowBytes.slot1lbl = 'Rise'
                    tempSetShowBytes.slot2lbl = 'Fall'
                    tempSetShowBytes.slot3lbl = ''

                    this.props.getStructure(this.state.parentCh, tempSetShowBytes)
                }

                return {
                    slot1lbl: 'Rise:',
                    slot2lbl: 'Fall:',
                    slot3lbl: ''
                }
            })

        } else if (e.label === 'Flash') {
            this.setState((state) => {

                if (this.props.getStructure !== undefined) {
                    tempSetShowBytes.slot1lbl = 'Durtn:'
                    tempSetShowBytes.slot2lbl = 'Rise:'
                    tempSetShowBytes.slot3lbl = 'Fall:'

                    this.props.getStructure(this.state.parentCh, tempSetShowBytes)
                }

                return {
                    slot1lbl: 'Durtn:',
                    slot2lbl: 'Rise:',
                    slot3lbl: 'Fall:'
                }
            })

        } else if (e.label === 'Blink') {
            this.setState((state) => {

                if (this.props.getStructure !== undefined) {
                    tempSetShowBytes.slot1lbl = 'Freq:'
                    tempSetShowBytes.slot2lbl = 'Len:'
                    tempSetShowBytes.slot3lbl = 'Fall:'

                    this.props.getStructure(this.state.parentCh, tempSetShowBytes)
                }

                return {
                    slot1lbl: 'Freq:',
                    slot2lbl: 'Len:',
                    slot3lbl: 'Fall:'
                }
            })

        } else if (e.label === 'Breath') {
            this.setState((state) => {

                if (this.props.getStructure !== undefined) {
                    tempSetShowBytes.slot1lbl = 'Freq:'
                    tempSetShowBytes.slot2lbl = 'Low:'
                    tempSetShowBytes.slot3lbl = ''

                    this.props.getStructure(this.state.parentCh, tempSetShowBytes)
                }

                return {
                    slot1lbl: 'Freq:',
                    slot2lbl: 'Low:',
                    slot3lbl: ''
                }
            })
        }
    }

    render() {
        //console.log('RENDER ' + this.state.sliderval)
        return (
            <div style={mainDiv}>
                <div style={{ userSelect: 'none' }}>LED Options</div>
                <table style={{ width: '100%' }}>
                    <colgroup>
                        <col width="1px" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td style={dotCell} onMouseDown={this.clrPckr}>
                                <span style={{
                                    height: '20px',
                                    width: '90%',
                                    backgroundColor: 'hsl(' +
                                        this.state.color[0] + ',' +
                                        this.state.color[1] + '%,' +
                                        this.state.color[2] + '%' +
                                        ')',
                                    /*borderRadius: '100%',*/
                                    borderRadius: '5px',
                                    display: 'inline-block',
                                    margin: '2px 0px',
                                    verticalAlign: "middle"
                                }}></span>
                            </td>
                            <td style={td}>
                                <div style={{ userSelect: 'none' }}>Color / Brightness</div>

                            </td>
                        </tr>
                        <tr>
                            <td style={label}>Style:</td>
                            <td style={td}>
                                <div>
                                    <Select
                                        styles={styles}
                                        options={typesDropDown}
                                        value={this.state.type}
                                        onChange={(e) => {
                                            this.typeChange(e)
                                        }}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={label}>{this.state.slot1lbl}</td>
                            <td style={td}>
                                {slot1ui}
                            </td>
                        </tr>
                        <tr>
                            <td style={label}>{this.state.slot2lbl}</td>
                            <td style={td}>
                                {slot2ui}
                            </td>
                        </tr>
                        <tr>
                            <td style={label}>{this.state.slot3lbl}</td>
                            <td style={td}>{slot3ui}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

let allTypes = ['Solid', 'Flash', 'Blink', 'Breath']
let typesDropDown = []
createOptions(allTypes, typesDropDown)

let slot1ui = []
let slot2ui = []
let slot3ui = []

function createOptions(pointer, output) {
    for (const [value, label] of pointer.entries()) {
        output.push({ label, value })
    }

    for (var i = 0; i < output.length; i++) {
        output[i].label = String(output[i].label)
    }
    //console.log(output)
}


//STYLE///////////////////////////////////////////////
const td = {
    border: '1px black solid'
}

const dotCell = {
    border: '1px black solid',
    alignContents: 'center',
}

const label = {
    border: '1px black solid',
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
    fontSize: '12px'
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

export default midiLightLED
