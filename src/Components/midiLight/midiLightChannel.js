import React, { Component } from 'react'
import OutputCmdPicker from './../utilities/outputCmdPicker'
import MidiLightLED, { midiLightLED } from './midiLightLED'
import { v4 as uuid } from 'uuid';

export class midiLightChannel extends Component {
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
                                            <td style={tblcell}><h3>LED #{this.props.channel}</h3></td>
                                        </tr>
                                        <tr>
                                            <td style={tblcell}>
                                                Name:
                                            <input id={uuid()} style={{ margin: '3px' }} defaultValue=' User Assigned Name' />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style={tblcell}><MidiLightLED /></td>
                        </tr>
                        <tr>
                            <td style={tblcell}><OutputCmdPicker /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const tblcell = {
    textAlign: 'center',
    border: '2px black solid',
}

const mainDiv = {
    backgroundColor: 'darkgrey',
    display: 'inline-block',
    padding: '5px',
    border: '2px black solid',
    margin: '5px'
}

export default midiLightChannel
