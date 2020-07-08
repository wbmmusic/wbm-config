import React, { Component } from 'react'
import InputCommandPickerv2 from './../utilities/pickers/inputPicker/InputCommandPickerv2'
import { defaultStateData } from './../utilities/pickers/outputPicker/outputCmdPicker'
import MidiLightLED from './midiLightLED'
import NameInput from '../utilities/NameInput';
import CommandsContainer from '../utilities/pickers/CommandsContainer'


const { ipcRenderer } = window.require('electron')

export class midiLightChannel extends Component {


    constructor(props) {
        super(props);
        this.state = {
            channel: this.props.channel,
            name: 'Name this LED',
            pickerData: defaultStateData(this.props.channel),
            ledData: []
        }
        //console.log('YXXX channel Constructor #' + this.state.channel)
        //console.log(this.state.pickerData)
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

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.statex !== prevState) {
            return nextProps.statex;
        }
        else return null;
    }

    makePicker = () => {
        //console.log('Make Picker ' + this.state.channel)
        return (
            <CommandsContainer direction="in"/>
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

    setName = (newName) => {

        this.setState({ name: newName })

        if (this.props.getChanelInfo !== undefined) {
            let tempNameState = this.state
            tempNameState.name = newName
            this.props.getChanelInfo(this.state.channel, tempNameState)
        }

        //Send info to color picker window
        ipcRenderer.send('nameChange', this.state.channel, newName)
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
                                                {/* <button style={{ borderRadius: '4px' }} onMouseDown={this.printState.bind(this)}>STATE</button> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={tblcell}>
                                                <NameInput value={this.state.name} setValue={this.setName} />
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
    fontSize: '12px',
    height: '600px'
}

export default midiLightChannel
