import React, { Component } from 'react'
import Select from 'react-select'
import { v4 as uuid } from 'uuid';


export class midiLightLED extends Component {

    render() {

        return (
            <div style={mainDiv}>
                LED Options
                <table style={{ width: '100%' }}>
                    <col width="1px" />
                    <tbody>
                        <tr>
                            <td style={dotCell}>
                                <span style={dot}>

                                </span>
                            </td>
                            <td style={td}>Color</td>
                        </tr>
                        <tr>
                            <td style={label}>Style:</td>
                            <td style={td}>
                                <div>
                                    <Select
                                        id={uuid()}
                                        options={typesDropDown}
                                        defaultValue={{
                                            label: allTypes[0],
                                            value: 0,
                                        }}
                                    //onValueChange={() => { }}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={label}>A:</td>
                            <td style={td}>d</td>
                        </tr>
                        <tr>
                            <td style={label}>B:</td>
                            <td style={td}>e</td>
                        </tr>
                        <tr>
                            <td style={label}>C:</td>
                            <td style={td}>f</td>
                        </tr>
                    </tbody>
                </table>
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
    border: '1px black solid'
}

const dotCell = {
    border: '1px black solid',
    alignContents: 'center',
}

const label = {
    border: '1px black solid',
    textAlign: 'right',
    paddingRight: '4px',
}

const dot = {
    height: '30px',
    width: '90%',
    backgroundColor: 'magenta',
    /*borderRadius: '100%',*/
    display: 'inline-block',
    margin: '3px',
    verticalAlign: "middle",
}

const mainDiv = {
    backgroundColor: 'lightgrey',
    padding: '8px',
    maxWidth: '500px',
    borderRadius: '10px',
    margin: '4px',
}


export default midiLightLED
