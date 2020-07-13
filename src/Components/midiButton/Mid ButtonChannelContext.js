import React, { useState, createContext } from 'react'

export const MidiButtonChannelContext = createContext();

export const MidiButtonChannelProvider = (props) => {
    const [channel, setChannel] = useState({
        name: 'Midi Button Ch Name',
        commands: [],
    })

    return (
        <MidiButtonChannelContext.Provider value={[channel, setChannel]}>
            {props.children}
        </MidiButtonChannelContext.Provider>
    )
}
