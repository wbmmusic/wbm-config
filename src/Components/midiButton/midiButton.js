import React, { Component } from 'react'
import MidiBtnChannel from "./midiBtnChannel";
import { v4 as uuid } from 'uuid';

export class midiButton extends Component {
    createTable = () => {
        let table = []
        // Outer loop to create parent
        for (let i = 0; i < 6; i++) {
            //Create the parent and add the children
            table.push(
                <div style={chnl} key={uuid()}>
                    <MidiBtnChannel
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
                <h2>MIDI Button</h2>
                {this.createTable()}
            </div>
        )
    }
}

const chnl={
    display: 'inline-block',
    padding: '6px',
    border: '2px black solid',
}

export default midiButton
