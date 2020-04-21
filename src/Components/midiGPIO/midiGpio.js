import React, { Component } from 'react'
import MidiGpioChannel from './midiGpioChannel'
import { v4 as uuid } from 'uuid';

export class midiGpio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberOfChannels: 6,
            channelData: []
        }

        channels = this.createTable()
    }

    createTable = () => {
        let table = []
        // Outer loop to create parent
        for (let i = 0; i < this.state.numberOfChannels; i++) {
            //Create the parent and add the children
            table.push(
                <div style={chnl} key={uuid()}>
                    <MidiGpioChannel
                        channel={i + 1}
                        id={i + 1}
                    />
                </div>
            )
        }
        return table
    }

    render() {
        return (
            <div>
                <b style={{ display: 'block' }}>MIDI GPIO</b>
                {channels}
            </div>
        )
    }
}

let channels = []

const chnl = {
    backgroundColor: 'darkgrey',
    display: 'inline-block',
    padding: '3px',
    border: '2px black solid',
    margin: '3px',
    borderRadius: "10px",
}

export default midiGpio
