import React, { Component } from 'react'
import Select from 'react-select'
import { v4 as uuid } from 'uuid';
const { ipcRenderer } = window.require('electron')

export class midiLightLED extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            channel: this.props.channel,
            color: [200, 100, 50] //HSL
        }
    }


    clrPckr = () => {
        ipcRenderer.send('showColorPicker', this.state.channel, this.state.name, this.state.color)
    }

    componentDidMount() {
        ipcRenderer.on('colorFromPicker', (event, rgb, chnl, HSL) => {

            if (chnl === this.state.channel) {

                this.setState({ color: [parseInt(HSL[0]), HSL[1], HSL[2]] });
                //console.log(this.state.color)
                //console.log('SelectedColor')
                //console.log(rgb)
                //console.log(chnl)
            }
        })
    }

    componentDidUpdate() {
        if (this.state.name !== this.props.name) {
            this.setState({ name: this.props.name })
        }

        if (this.state.channel !== this.props.channel) {
            this.setState({ channel: this.props.channel })
        }

        //console.log(this.state.color)
    }

    chnl = this.props.channel


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
                                        id={uuid()}
                                        options={typesDropDown}
                                        defaultValue={{
                                            label: allTypes[0],
                                            value: 0,
                                        }}
                                    //onValueChange={() => { }}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={label}>A:</td>
                            <td style={td}>d</td>
                        </tr>
                        <tr>
                            <td style={label}>B:</td>
                            <td style={td}>e</td>
                        </tr>
                        <tr>
                            <td style={label}>C:</td>
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
