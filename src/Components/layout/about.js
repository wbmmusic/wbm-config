import React, { useState } from 'react'
import Matraces from '../matrix/matraces'

export default function About() {
    const defaultState = {
        devices: [
            {
                name: 'midi splitter',
                numberOfInputs: 1,
                numberOfOutputs: 3,
                numberOfInputPatches: 16,
                numberOfOutputPatches: 16,
                inputNames: ['input 1'],
                outputNames: ['Out #1', 'Out #2', 'Out #3'],
                usrOutputNames: ['Motif', 'MPC', 'Moog'],
            }
        ]
    }

    const [state, setstate] = useState(defaultState)

    return (
        <div>
                <Matraces
                    device={state.devices[0]}
                />
            </div>
    )
}
