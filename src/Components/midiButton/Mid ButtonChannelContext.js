import React, { useState, createContext } from 'react'

export const MidiButtonChannelContext = createContext();

export const MidiButtonChannelProvider = (props) => {
    const [channel, setChannel] = useState({
        name: 'Midi Button Ch Name',
        commands: [],
        ledData: {
            color: [40, 100, 50], //HSL
            type: {
                label: 'Solid',
                value: 0
            }
        }
    })

    return (
        <MidiButtonChannelContext.Provider value={[channel, setChannel]}>
            {props.children}
        </MidiButtonChannelContext.Provider>
    )
}
