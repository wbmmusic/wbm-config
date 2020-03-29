import React, { Component } from 'react'
import { SimpleSelect } from "react-selectize";
import { v4 as uuid } from 'uuid';

export class midiLightLED extends Component {
    render() {
        return (
            <div style={{ backgroundColor: 'lightpink' }}>
                <div style={mainDiv}>
                    <p>LED Options</p>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td style={td}>
                                    <span style={dot}>

                                    </span>
                                </td>
                                <td style={td}>Color</td>
                            </tr>
                            <tr>
                                <td style={td}>Style:</td>
                                <td style={td}>
                                    <div>
                                        <SimpleSelect
                                            id={uuid()}
                                            hideResetButton='true'
                                            style={{ textAlign: 'left' }}
                                            options={typesDropDown}
                                            placeholder="Solid"
                                            theme="default"
                                            onValueChange={() => { }}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={td}>A:</td>
                                <td style={td}>d</td>
                            </tr>
                            <tr>
                                <td style={td}>B:</td>
                                <td style={td}>e</td>
                            </tr>
                            <tr>
                                <td style={td}>C:</td>
                                <td style={td}>f</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

let allTypes = ['Solid', 'Flash', 'Blink', 'Breath']
let typesDropDown = []
createOptions(allTypes, typesDropDown)

function createOptions(pointer, output) {
    for (const [value, label] of pointer.entries()) {
        output.push({ label, value })
    }

    for (var i = 0; i < output.length; i++) {
        output[i].label = String(output[i].label)
    }

    //console.log(output)
}

const td = {
    border: '2px black solid'
}

const dot = {
    height: '30px',
    width: '30px',
    backgroundColor: 'magenta',
    borderRadius: '50%',
    display: 'inline-block',
    margin: '3px',
}

const mainDiv = {
    backgroundColor: 'lightgrey',
    padding: '8px',
    maxWidth: '500px',
    borderRadius: '10px',
    margin: '4px',
}


export default midiLightLED
