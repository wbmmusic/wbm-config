import React, { Component } from 'react'
import Matraces from '../matrix/matraces'


export class about extends Component {
    state = {
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

    render() {

        return (
            <div>
                <Matraces
                    device={this.state.devices[0]}
                />
            </div>
        )
    }

}



export default about
