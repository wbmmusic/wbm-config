import React, { Component } from 'react'

export class midiGpioChannel extends Component {
    render() {
        return (
            <div>
                <p>MIDI GPIO Channel {this.props.channel}</p>
            </div>
        )
    }
}

export default midiGpioChannel
