import React, { useState, createContext } from 'react'

export const MidiLightChannelContext = createContext();

export const MidiLightChannelProvider = (props) => {
    const [channel, setChannel] = useState({
        name: 'Name This Channel',
        ledData: {
            color: [200, 100, 50], //HSL
            type: {
                label: 'Solid',
                value: 0
            },
            sliderval: 20
        },
        commands: []
    })

    return (
        <MidiLightChannelContext.Provider value={[channel, setChannel]}>
            {props.children}
        </MidiLightChannelContext.Provider>
    )
}
