import React from 'react'
import MidiBtnChannel from "./MidiBtnChannel";
import { v4 as uuid } from 'uuid';
import { MidiButtonChannelProvider } from './Mid ButtonChannelContext';

export default function MidiButton() {

    const createChannels = () => {
        let table = []
        // Outer loop to create parent
        for (let i = 0; i < 6; i++) {
            //Create the parent and add the children
            table.push(
                <div style={chnl} key={"MidiButtonChannelDiv" + i}>
                    <MidiButtonChannelProvider key={"MidiButtonChannelProvider" + i}>
                        <MidiBtnChannel
                            id={uuid()}
                            channel={i + 1}
                        />
                    </MidiButtonChannelProvider>
                </div>
            )
        }
        return table
    }


    return (
        <div>
            <div style={{
                backgroundColor: 'darkgrey',
                paddingBottom: '4px',
            }}>
                <b style={{ display: 'block' }}>MIDI Button</b>
            </div>
            {createChannels()}
        </div>
    )
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