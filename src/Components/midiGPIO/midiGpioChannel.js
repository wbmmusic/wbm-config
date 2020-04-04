import React, { Component } from 'react'
import OutputCmdPicker from './../utilities/outputCmdPicker'
import MidiGpioIO from './midiGpioIO'

export class midiGpioChannel extends Component {
    render() {
        return (
            <div style={{width: '300px'}}>
                <table style={{width: '100%'}}>
                    <tbody>
                        <tr>
                            <td style={tblcell}>
                                <b>I/O #{this.props.channel}</b>
                            </td>
                        </tr>
                        <tr>
                            <td style={tblcell}>
                                <MidiGpioIO />
                            </td>
                        </tr>
                        <tr>
                            <td style={tblcell}>
                                <OutputCmdPicker />
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
}

export default midiGpioChannel
