import React, { Component } from 'react'
import OutputCmdPicker from './../utilities/outputCmdPicker'
import MidiLightLED from './midiLightLED'
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
                                            <td style={tblcell}><b>LED #{this.props.channel}</b></td>
                                        </tr>
                                        <tr>
                                            <td style={tblcell}>
                                                <input id={uuid()} style={{
                                                    margin: '3px',
                                                    textIndent: '4px',
                                                    textAlign: 'center',
                                                    width: '95%'
                                                }}
                                                    defaultValue='Name this LED' />
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
