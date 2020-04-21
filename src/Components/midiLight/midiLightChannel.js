import React, { Component } from 'react'
import OutputCmdPicker, {defaultStateData} from './../utilities/outputCmdPicker'
import MidiLightLED from './midiLightLED'
const { ipcRenderer } = window.require('electron')

console.log('XXXX Channel')

export class midiLightChannel extends Component {
    state = {
        channel: this.props.channel,
        name: 'Name this LED',
        pickerData: defaultStateData(this.props.channel)
    }


    constructor(props) {
        super(props);
        console.log('YXXX channel Constructor #' + this.state.channel)
        console.log(this.state.pickerData)
        this.handleName = this.handleName.bind(this);
        this.getStructure = this.getStructure.bind(this);
        this.printState = this.printState.bind(this);
        this.setState({ channel: this.state.channel })
        thePicker = this.makePicker()
    }

    getStructure = (chnl, e) => {
        console.log('XXX GOT STRUCTURE #' + chnl)
        if (chnl === this.state.channel) {
            console.log('GOT TEMPLATE FOR ' + chnl)
            console.log(e)
            if (this.state.pickerData !== e) {
                console.log('Setting the state of ' + this.state.channel)
                this.setState({ pickerData: e })
                console.log(e)
            }
        }
    }

    handleName = (e) => {
        console.log('HHHH'+ this.state.channel)
        this.setState({ name: e.target.value })
        
        ipcRenderer.send('nameChange', this.state.channel, e.target.value)
    }

    componentDidUpdate = () => {
        console.log('Channel ' + this.state.channel + ' UPDATED')
        console.log(this.state)

        if (this.props.statex !== this.state.pickerData) {
            this.setState(this.props.statex)
            console.log('ch ' + this.state.channel + ' no match')
        }
    }

    componentDidMount = () => {
        console.log('XXXX MIDI CHANNEL DID MOUNT #' + this.state.channel)
        console.log(this.state)
    }

    componentWillMount = () => {
        console.log('XXXX MIDI CHANNEL WILL MOUNT #' + this.props.channel)
        if (this.state !== this.props.statex) {
            this.setState(this.props.statex)
        }

        console.log('Channel ' + this.state.channel + ' Will Mount')
    }

    makePicker = () => {
        console.log('Make Picker ' + this.state.channel)
        console.log(this.state)
        return (
            <OutputCmdPicker
                statex={this.state.pickerData}
                getStructure={this.getStructure}
                channel={this.state.channel}//////////////////////////////////////////////
            />
        )
    }

    printState = () => {
        console.log('SSSS Print chnl state')
        console.log('Print CH #' + this.state.channel + ' STATE')
        console.log(this.state)
    }

    render() {
        return (
            <div style={mainDiv}>
                <table>
                    <tbody>
                        <tr>
                            <td style={tblcell}>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td style={tblcell}><b>LED #{this.props.channel}</b></td>
                                        </tr>
                                        <tr>
                                            <td style={tblcell}>
                                                <button onMouseDown={this.printState}>
                                                Print CH {this.state.channel} STATE
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={tblcell}>
                                                <input
                                                    style={{
                                                        margin: '3px',
                                                        textIndent: '4px',
                                                        textAlign: 'center',
                                                        width: '95%'
                                                    }}
                                                    value={this.state.name}
                                                    onChange={this.handleName}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style={tblcell}>
                                <MidiLightLED
                                    channel={this.state.channel}
                                    name={this.state.name}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={tblcell}>
                                {thePicker}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

let thePicker

const tblcell = {
    textAlign: 'center',
    width: '300px'
}

const mainDiv = {
    backgroundColor: 'darkgrey',
    display: 'inline-block',
    padding: '3px',
    border: '2px black solid',
    margin: '3px',
    borderRadius: "10px",
}

export default midiLightChannel
