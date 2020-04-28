import React, { Component } from 'react'
import OutputCmdPicker, { defaultStateData } from './../utilities/outputCmdPicker'
import MidiLightLED from './midiLightLED'
const { ipcRenderer } = window.require('electron')

export class midiLightChannel extends Component {
    state = {
        channel: this.props.channel,
        name: 'Name this LED',
        pickerData: defaultStateData(this.props.channel),
        ledData: []
    }


    constructor(props) {
        super(props);
        //console.log('YXXX channel Constructor #' + this.state.channel)
        //console.log(this.state.pickerData)
        this.handleName = this.handleName.bind(this);
        this.getPickerStructure = this.getPickerStructure.bind(this);
        this.printState = this.printState.bind(this);
    }


    getLedStructure = (chnl, e) => {
        //console.log('XXX GOT STRUCTURE #' + chnl)
        this.setState({ ledData: e })

        let tempLedState = this.state
        tempLedState.ledData = e
        this.props.getChanelInfo(this.state.channel, tempLedState)
    }

    getPickerStructure = (chnl, e) => {
        //console.log('XXX GOT STRUCTURE #' + chnl)
        this.setState({ pickerData: e })

        let tempUpdateState = this.state
        tempUpdateState.pickerData = e
        this.props.getChanelInfo(this.state.channel, tempUpdateState)
    }

    handleName = (e) => {
        this.setState({ name: e.target.value })

        if (this.props.getChanelInfo !== undefined) {
            let tempNameState = this.state
            tempNameState.name = e.target.value
            this.props.getChanelInfo(this.state.channel, tempNameState)
        }

        ipcRenderer.send('nameChange', this.state.channel, e.target.value)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.statex !== prevState) {
            return nextProps.statex;
        }
        else return null;
    }

    makePicker = () => {
        //console.log('Make Picker ' + this.state.channel)
        return (
            <OutputCmdPicker
                statex={this.state.pickerData}
                getStructure={this.getPickerStructure}
                channel={this.state.channel}//////////////////////////////////////////////
            />
        )
    }

    printState = () => {
        console.log('Print CH #' + this.state.channel + ' STATE')
        console.log(this.state)
    }

    componentDidMount() {
        //console.log('MIDI LIGHT CHANNEL DID MOUNT #' + this.state.channel)

        if (this.props.getChanelInfo !== undefined) {
            if (this.state !== this.props.statex) {
                this.props.getChanelInfo(this.state.channel, this.state)
            }
        }


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
                                            <td style={{ fontSize: '14px' }}>
                                                <b>LED #{this.props.channel}</b>
                                                <br />
                                                <button style={{ borderRadius: '4px' }} onMouseDown={this.printState.bind(this)}>STATE</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={tblcell}>
                                                <input
                                                    style={{
                                                        margin: '3px',
                                                        textIndent: '4px',
                                                        textAlign: 'center',
                                                        width: '95%',
                                                        fontSize: '12px'
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
                                    getStructure={this.getLedStructure}
                                    statex={this.state.ledData}
                                    channel={this.state.channel}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={tblcell}>
                                {this.makePicker()}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

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
    fontSize: '12px'
}

export default midiLightChannel
