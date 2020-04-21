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
                <b style={{display: 'block'}}>MIDI Button</b>
                {this.createTable()}
            </div>
        )
    }
}

const chnl={
    backgroundColor: 'darkgrey',
    display: 'inline-block',
    padding: '3px',
    border: '2px black solid',
    margin: '3px',
    borderRadius: "10px",
}

export default midiButton
