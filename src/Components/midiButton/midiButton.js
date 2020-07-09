import React, { Component } from 'react'
import MidiBtnChannel from "./MidiBtnChannel";
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
                <div style={{
                    backgroundColor: 'darkgrey',
                    paddingBottom: '4px',
                }}>
                    <b style={{ display: 'block' }}>MIDI Button</b>
                </div>
                {this.createTable()}
            </div>
        )
    }
}

const chnl = {
    backgroundColor: 'darkgrey',
    display: 'inline-block',
    padding: '3px',
    border: '1px solid grey',
    boxShadow: '1px 1px 6px',
    margin: '3px',
    borderRadius: "10px",
}

export default midiButton
