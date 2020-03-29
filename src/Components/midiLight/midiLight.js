import React, { Component } from 'react'
import MidiLightChannel from './midiLightChannel'
import { v4 as uuid } from 'uuid';


export class midiLight extends Component {
    createTable = () => {
        let table = []
        // Outer loop to create parent
        for (let i = 0; i < 6; i++) {
            //Create the parent and add the children
            table.push(
                <div style={chnl} key={uuid()}>
                    <MidiLightChannel
                        id={uuid()}
                        channel={i + 1}
                    />
                </div>
            )
        }
        return table
    }

    render() {
        return (
            <div>
                <h1>MIDI Light</h1>
                <div>
                    <p>These devices will have a varying number of LEDs</p>
                    <p>Below we see UIs for each LED</p>
                </div>
                {this.createTable()}
            </div>

        )
    }
}

const chnl={
    display: 'inline-block',
    padding: '6px',
}

export default midiLight
