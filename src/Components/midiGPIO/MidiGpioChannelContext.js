import React, { useState, createContext } from 'react'

export const MidiGpioChannelContext = createContext();

export const MidiGpioChannelProvider = (props) => {
    const [channel, setChannel] = useState({
        name: 'Midi Gpio Ch Name',
        in: false,
        trs: false,
        pickRing: false,
        commands: [],
        ringIn:{
            commands:[]
        },
        ringOut:{
            commands:[]
        },
        tipIn:{
            commands:[]
        },
        tipOut:{
            commands:[]
        }
    })

    return (
        <MidiGpioChannelContext.Provider value={[channel, setChannel]}>
            {props.children}
        </MidiGpioChannelContext.Provider>
    )
}
