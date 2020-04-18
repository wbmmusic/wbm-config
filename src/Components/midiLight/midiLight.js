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
                <b style={{display: 'block'}}>MIDI Light</b>
                {this.createTable()}
            </div>

        )
    }
}

const chnl = {
    display: 'inline-block',
}

export default midiLight
