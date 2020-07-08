import React from 'react'
import CommandsContainer from './pickers/CommandsContainer'

export default function Dummy() {
    return (
        <div>
            <div style={styy}>
                <CommandsContainer direction="in" />
            </div>
            <div style={styy}>
                <CommandsContainer direction="out" />
            </div>

        </div>
    )
}

const styy = {
    width: '300px',
    display: 'inline-block',
    padding:'20px'
}