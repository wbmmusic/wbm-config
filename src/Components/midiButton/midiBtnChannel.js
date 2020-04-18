import React, { Component } from 'react'
import OutputCmdPicker from './../utilities/outputCmdPicker'

export class midiBtnChannel extends Component {
    render() {
        return (
            <div style={{
                border: '5px black solid',
                borderRadius: '10px',
                padding: '10px'
            }}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <b>Button # {this.props.channel}</b>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    style={{
                                        textAlign: 'center'
                                    }}
                                    type='text'
                                    value='Enter A Name'
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Button Config</td>
                        </tr>
                        <tr>
                            <td>Command Stuff</td>
                        </tr>
                        <tr>
                            <td>
                                <OutputCmdPicker />
                            </td>
                        </tr>
                    </tbody>
                </table>


            </div>
        )
    }
}

export default midiBtnChannel
