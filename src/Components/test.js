import React, { Component } from 'react'
import { v4 as uuid } from 'uuid';

export class test extends Component {
    state = {
        types: [
            {
                id: uuid(),
                type: 'Note On',
                field0: ['Channel', 0],
                field1: ['Note', 0],
                field2: ['Velocity', 0],
                active: false,
            },
            {
                id: uuid(),
                type: 'Note Off',
                field0: ['Channel', 0],
                field1: ['Note', 0],
                field2: ['Velocity', 0],
                active: false,
            },
            {
                id: uuid(),
                type: 'Control Change',
                field0: ['Channel', 0],
                field1: ['Controller #', 0],
                field2: ['Value', 0],
                active: false,
            },
            {
                id: uuid(),
                type: 'Program Change',
                field0: ['Channel', 0],
                field1: ['Program #', 0],
                field2: null,
                active: false,
            },
            {
                id: uuid(),
                type: 'Sys Ex',
                field0: ['HEX Data', 0],
                field1: null,
                field2: null,
                active: false,
            },
            {
                id: uuid(),
                type: 'Song Select',
                field0: ['Song #', 0],
                field1: null,
                field2: null,
                active: false,
            },
            {
                id: uuid(),
                type: 'Start',
                field0: null,
                field1: null,
                field2: null,
                active: false,
            },
            {
                id: uuid(),
                type: 'Continue',
                field0: null,
                field1: null,
                field2: null,
                active: false,
            },
            {
                id: uuid(),
                type: 'Stop',
                field0: null,
                field1: null,
                field2: null,
                active: false,
            },
            {
                id: uuid(),
                type: 'System Reset',
                field0: null,
                field1: null,
                field2: null,
                active: false,
                
            },
        ]
    }

    

    render() {
        return this.state.types.map((type) => (
            <h2>{type.type}</h2>
        ));
    }
}

export default test
