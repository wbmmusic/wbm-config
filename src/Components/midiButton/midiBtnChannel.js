import React, { Component } from 'react'
import OutputCmdPicker, { defaultStateData } from './../utilities/outputCmdPicker'

export class midiBtnChannel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            channel: this.props.channel,
            name: 'Name this button'
        }

        this.handleName = this.handleName.bind(this);
    }

    handleName(e){
        this.setState({name: e.target.value})
        //ipcRenderer.send('nameChange', this.state.channel, e.target.value)
    }


    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <b>Button # {this.state.channel}</b>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    style={{
                                        textAlign: 'center'
                                    }}
                                    type='text'
                                    value={this.state.name}
                                    onChange={this.handleName}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px black solid' }}>
                                <p>This is where button config stuff should go..</p>
                                <p>Momentary / Latching / etc..</p>
                            </td>
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
