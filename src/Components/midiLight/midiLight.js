import React, { Component } from 'react'
import MidiLightChannel from './midiLightChannel'
import { v4 as uuid } from 'uuid';

console.log('XXXX MIDI LIGHT TOP')

export class midiLight extends Component {
    state = {
        numberOfChannels: 6
    }

    constructor(props) {
        super(props)
        console.log('XXXX MIDI LIGHT TOP Constructor')
        theData = this.createTable()
    }

    componentWillMount() {
        console.log('XXXX MIDI LIGHT TOP WILL MOUNT')
    }

    componentDidMount() {
        console.log('XXXX MIDI LIGHT TOP DID MOUNT')
    }

    createTable = () => {
        table = []
        // Outer loop to create parent
        for (let i = 0; i < this.state.numberOfChannels; i++) {
            //Create the parent and add the children
            console.log('XXX make chnl #' + (i + 1))
            table.push(
                <div 
                key={uuid()}
                style={{
                    display: 'inline-block'
                }}
                    channel={(i + 1)}
                >
                    <MidiLightChannel
                        id={'gpiochnl' + (i + 1)}
                        channel={(i + 1)}
                    />
                </div>
            )
        }
        return table
    }

    render() {
        return (
            <div>
                <b style={{ display: 'block' }}>MIDI Light</b>
                {theData}
            </div>
        )
    }
}

let theData
let table = []

export default midiLight
