import React, { Component } from 'react'
import Select from 'react-select'
const { ipcRenderer } = window.require('electron')

export class midiLightLED extends Component {
    state = {
        name: this.props.name,
        channel: this.props.channel,
        color: [200, 100, 50], //HSL
        type: {
            label: 'Solid',
            value: 0
        },
        slot1lbl: 'Rise:',
        slot2lbl: 'Fall:',
        slot3lbl: ''
    }

    constructor(props) {
        super(props)

        console.log('LIGHT ' + this.props.channel)
        console.log(this.state)
        thisChannel = this.props.channel
        this.clrPckr = this.clrPckr.bind(this)
    }

    clrPckr = () => {
        ipcRenderer.send('showColorPicker', this.state.channel, this.state.name, this.state.color)
    }

    componentDidMount() {
        ipcRenderer.on('colorFromPicker', (event, rgb, chnl, HSL) => {

            if (chnl === this.state.channel) {

                this.setState({ color: [parseInt(HSL[0]), HSL[1], HSL[2]] });
                console.log(this.state.color)
                console.log('SelectedColor')
                console.log(rgb)
                console.log(chnl)
            }
        })
    }

    componentDidUpdate() {
        if (this.state.name !== this.props.name) {
            this.setState({ name: this.props.name })
            console.log('LED NAME CHANGE')
        }


        //console.log(this.state.color)
    }

    typeChange(e) {
        console.log(e)
        this.setState({ type: e })

        if (e.label === 'Solid') {
            this.setState({
                slot1lbl: 'Rise:',
                slot2lbl: 'Fall:',
                slot3lbl: ''
            })
        } else if (e.label === 'Flash') {
            this.setState({
                slot1lbl: 'Durtn:',
                slot2lbl: 'Rise:',
                slot3lbl: 'Fall:'
            })
        } else if (e.label === 'Blink') {
            this.setState({
                slot1lbl: 'Freq:',
                slot2lbl: 'Len:',
                slot3lbl: 'Fall:'
            })
        } else if (e.label === 'Breath') {
            this.setState({
                slot1lbl: 'Freq:',
                slot2lbl: 'Low:',
                slot3lbl: ''
            })
        }
    }

    chnl = thisChannel

    render() {
        return (
            <div style={mainDiv}>
                LED Options
                <table style={{ width: '100%' }}>
                    <colgroup>
                        <col width="1px" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td style={dotCell}>
                                <span style={{
                                    height: '30px',
                                    width: '90%',
                                    backgroundColor: 'hsl(' +
                                        this.state.color[0] + ',' +
                                        this.state.color[1] + '%,' +
                                        this.state.color[2] + '%' +
                                        ')',
                                    /*borderRadius: '100%',*/
                                    borderRadius: '10px',
                                    display: 'inline-block',
                                    margin: '3px',
                                    verticalAlign: "middle"
                                }} onMouseDown={this.clrPckr}></span>
                            </td>
                            <td style={td}>Color / Brightness</td>
                        </tr>
                        <tr>
                            <td style={label}>Style:</td>
                            <td style={td}>
                                <div>
                                    <Select
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
                            <td style={td}>d</td>
                        </tr>
                        <tr>
                            <td style={label}>{this.state.slot2lbl}</td>
                            <td style={td}>e</td>
                        </tr>
                        <tr>
                            <td style={label}>{this.state.slot3lbl}</td>
                            <td style={td}>f</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

let allTypes = ['Solid', 'Flash', 'Blink', 'Breath']
let typesDropDown = []
let thisChannel
createOptions(allTypes, typesDropDown)

function createOptions(pointer, output) {
    for (const [value, label] of pointer.entries()) {
        output.push({ label, value })
    }

    for (var i = 0; i < output.length; i++) {
        output[i].label = String(output[i].label)
    }
    //console.log(output)
}

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
    paddingLeft: '5px'
}

const mainDiv = {
    backgroundColor: 'lightgrey',
    padding: '8px',
    maxWidth: '500px',
    borderRadius: '10px',
    margin: '4px',
}


export default midiLightLED
