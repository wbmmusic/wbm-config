import React, { Component } from 'react'
import { SimpleSelect } from "react-selectize";
import { v4 as uuid } from 'uuid';
//import $ from 'jquery'
//import ReactDOM from 'react-dom'

export class outputCmdPicker extends Component {
    state = {
        id: 'picker',
        type: 'Note On',
        channel: 1,
        byte1: 0,
        byte2: 127,
    }
    render() {
        return (
            <div>
                <div style={mainDiv}>
                    <table id="pickerTable" style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <td colSpan="2" style={pickerTitle}>Command Picker</td>
                            </tr>
                            <tr>
                                <td style={td}>
                                    <div id="typeLbl" style={label}>Type:</div>
                                </td>
                                <td style={td}>
                                    <div id="typeDiv">
                                        <SimpleSelect
                                            key={uuid()}
                                            hideResetButton='true'
                                            style={{ textAlign: 'left' }}
                                            options={typesDropDown}
                                            placeholder={this.state.type}
                                            theme="default"
                                            onValueChange={() => { }}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={td}>
                                    <div id="byte0Lbl" style={label}></div>
                                </td>
                                <td style={td}>
                                    <div id="byte0Div">
                                        <SimpleSelect
                                            id={uuid()}
                                            hideResetButton='true'
                                            style={{ textAlign: 'left' }}
                                            options={oneSixteen}
                                            placeholder="Channel"
                                            theme="default"
                                            onValueChange={() => { }}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={td}>
                                    <div id="byte1Lbl" style={label}></div>
                                </td>
                                <td style={td}>
                                    <div id="byte1Div">
                                        <SimpleSelect
                                            id={uuid()}
                                            hideResetButton='true'
                                            style={{ textAlign: 'left' }}
                                            options={noteDropDown}
                                            placeholder="Note"
                                            theme="default"
                                            onValueChange={() => { }}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={td}>
                                    <div id="byte2Lbl" style={label}></div>
                                </td>
                                <td style={td}>
                                    <div id="byte2Div">
                                        <SimpleSelect
                                            id={uuid()}
                                            hideResetButton='true'
                                            style={{ textAlign: 'left' }}
                                            options={one127}
                                            placeholder="Velocity"
                                            theme="default"
                                            onValueChange={() => { }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

const mainDiv = {
    backgroundColor: 'lightgrey',
    padding: '8px',
    maxWidth: '500px',
    borderRadius: '10px',
    margin: '4px',
}

const td = {
    border: '1px black solid',
}

const pickerTitle = {
    border: '1px black solid',
    padding: '2px',
    textAlign: 'center',
}

const label = {
    textAlign: 'right',
}

//drawPicker()

var allTypes = ['Note On', 'Note Off', 'Control Change',
    'Program Change', 'Sys Ex', 'Song Select', 'Start',
    'Continue', 'Stop', 'System Reset'
]

var ccNameList = ["Bank Select", "Modulation Wheel or Lever", "Breath Controller",
    "Undefined", "Foot Controller", "Portamento Time", "Data Entry MSB",
    "Channel Volume (Main Volume)", "Balance", "Undefined", "Pan",
    "Expression Controller", "Effect Control 1", "Effect Control 2", "Undefined",
    "Undefined", "General Purpose Controller 1", "General Purpose Controller 2",
    "General Purpose Controller 3", "General Purpose Controller 4", "Undefined",
    "Undefined", "Undefined", "Undefined", "Undefined", "Undefined", "Undefined",
    "Undefined", "Undefined", "Undefined", "Undefined", "Undefined",
    "LSB for Control 0 (Bank Select)", "LSB for Control 1 (Modulation Wheel or Lever)",
    "LSB for Control 2 (Breath Controller)", "LSB for Control 3 (Undefined)",
    "LSB for Control 4 (Foot Controller)", "LSB for Control 5 (Portamento Time)",
    "LSB for Control 6 (Data Entry)", "LSB for Control 7 (Ch Volume, Main Volume)",
    "LSB for Control 8 (Balance)", "LSB for Control 9 (Undefined)", "LSB for Control 10 (Pan)",
    "LSB for Control 11 (Expression Controller)", "LSB for Control 12 (Effect control 1)",
    "LSB for Control 13 (Effect control 2)", "LSB for Control 14 (Undefined)",
    "LSB for Control 15 (Undefined)", "LSB for Control 16 (General Purpose Controller 1)",
    "LSB for Control 17 (General Purpose Controller 2)",
    "LSB for Control 18 (General Purpose Controller 3)",
    "LSB for Control 19 (General Purpose Controller 4)",
    "LSB for Control 20 (Undefined)", "LSB for Control 21 (Undefined)",
    "LSB for Control 22 (Undefined)", "LSB for Control 23 (Undefined)",
    "LSB for Control 24 (Undefined)", "LSB for Control 25 (Undefined)",
    "LSB for Control 26 (Undefined)", "LSB for Control 27 (Undefined)",
    "LSB for Control 28 (Undefined)", "LSB for Control 29 (Undefined)",
    "LSB for Control 30 (Undefined)", "LSB for Control 31 (Undefined)",
    "Damper Pedal on/off (Sustain)", "Portamento On/Off", "Sostenuto On/Off",
    "Soft Pedal On/Off", "Legato Footswitch", "Hold 2",
    "Sound Controller 1 (Sound Variation)",
    "Sound Controller 2 (Timbre/Harmonic Intens.)",
    "Sound Controller 3 (Release Time)", "Sound Controller 4 (Attack Time)",
    "Sound Controller 5 (Brightness)",
    "Sound Controller 6 (Decay Time)",
    "Sound Controller 7 (Vibrato Rate)",
    "Sound Controller 8 (Vibrato Depth)",
    "Sound Controller 9 (Vibrato Delay)",
    "Sound Controller 10 (default undefined)",
    "General Purpose Controller 5", "General Purpose Controller 6", "General Purpose Controller 7",
    "General Purpose Controller 8", "Portamento Control", "Undefined", "Undefined", "Undefined",
    "High Resolution Velocity Prefix", "Undefined", "Undefined",
    "FX 1 Depth (Reverb Send Level) (Ext FX Depth)",
    "FX 2 Depth (Tremolo Depth)",
    "FX 3 Depth (Chorus Send Level) (Chorus Depth)",
    "FX 4 Depth (Celeste [Detune] Depth)", "FX 5 Depth (Phaser Depth)",
    "Data Increment (Data Entry +1)", "Data Decrement (Data Entry -1)",
    "Non-Registered Parameter Number (NRPN) - LSB", "Non-Registered Parameter Number (NRPN) - MSB",
    "Registered Parameter Number (RPN) - LSB*", "Registered Parameter Number (RPN) - MSB*",
    "Undefined", "Undefined", "Undefined", "Undefined", "Undefined", "Undefined",
    "Undefined", "Undefined", "Undefined", "Undefined", "Undefined", "Undefined",
    "Undefined", "Undefined", "Undefined", "Undefined", "Undefined", "Undefined",
    "[CMM] All Sound Off",
    "[CMM] Reset All Controllers",
    "[CMM] Local Control On/Off", "[CMM] All Notes Off",
    "[CMM] Omni Mode Off (+ all notes off)",
    "[CMM] Omni Mode On (+ all notes off)",
    "[CMM] Mono Mode On (+ poly off, + all notes off)",
    "[CMM] Poly Mode On (+ mono off, +all notes off)"
]

const noteLetters = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B']

let noteNames = []
var octiveCnt = -2;
var noteInOctive = 0;
for (var i = 0; i < 128; i++) {
    noteNames[i] = i + ' - ' + noteLetters[noteInOctive] + octiveCnt

    noteInOctive++
    if (noteInOctive > 11) {
        //console.log('Octave ' + octiveCnt)
        octiveCnt++;
        noteInOctive = 0
    }
}

let range127 = []
for (i = 0; i < 128; i++) {
    range127[i] = i
}

let range16 = []
for (i = 0; i < 16; i++) {
    range16[i] = (i + 1)
}

let ccNames = []
for (i = 0; i < 128; i++) {
    ccNames[i] = i + ' - ' + ccNameList[i]
}

let ccDropDown = []
createOptions(ccNames, ccDropDown)

let oneSixteen = []
createOptions(range16, oneSixteen)

let noteDropDown = []
createOptions(noteNames, noteDropDown)

let one127 = []
createOptions(range127, one127)

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




//START Program //////////////////////////////////
function drawPicker() {
    createSelect('typeDiv', 'typeSel', allTypes)
    populatePicker()
    setOutput(makeOutput())

    /*
    $(document).ready(function() {
        $('select').selectize({
            //sortField: 'text'
        });
    });

    */
}
///////////////////////////////////////////////////

function populatePicker() {
    console.log('Populate Picker')
    var selected = document.getElementById('typeSel').value
    if (selected === 'Note On') {
        //console.log('Note On Selction draw')
        drawChRow()
        createLabel('byte1Lbl', 'Note:')
        createSelect('byte1Div', 'noteSel', noteNames)
        createLabel('byte2Lbl', 'Velocity:')
        createSelect('byte2Div', 'velSel', range127)
    } else if (selected === 'Note Off') {
        //console.log('Note Off Selction draw')
        drawChRow()
        createLabel('byte1Lbl', 'Note:')
        createSelect('byte1Div', 'noteSel', noteNames)
        createLabel('byte2Lbl', 'Velocity:')
        createSelect('byte2Div', 'velSel', range127)
    } else if (selected === 'Control Change') {
        //console.log('Control Change Selction draw')
        drawChRow()
        createLabel('byte1Lbl', 'CC#:')
        createSelect('byte1Div', 'ccSel', ccNames)
        createLabel('byte2Lbl', 'Value:')
        createSelect('byte2Div', 'ccValSel', range127)
    } else if (selected === 'Program Change') {
        //console.log('Program Change Selction draw')
        drawChRow()
        createLabel('byte1Lbl', 'Program #:')
        createSelect('byte1Div', 'pgmSel', range127)
        clearRows([2])
    } else if (selected === 'Sys Ex') {
        //console.log('Sys Ex Selction draw')
        createLabel('byte0Lbl', 'HEX Data:')
        createSelect('byte0Div', 'chSel', range16)
        clearRows([1, 2])
    } else if (selected === 'Song Select') {
        //console.log('Song Select Selction draw')
        createLabel('byte0Lbl', 'Song #:')
        createSelect('byte0Div', 'songSel', range127)
        clearRows([1, 2])
    } else if (selected === 'Start') {
        //console.log('Start Selction draw')
        clearRows([0, 1, 2])
    } else if (selected === 'Continue') {
        //console.log('Continue Selction draw')
        clearRows([0, 1, 2])
    } else if (selected === 'Stop') {
        //console.log('Stop Selction draw')
        clearRows([0, 1, 2])
    } else if (selected === 'System Reset') {
        //console.log('System Reset Selction draw')
        clearRows([0, 1, 2])
    }

    setOutput(makeOutput())
    /*
        $(document).ready(function() {
            $('select').selectize({
                //sortField: 'text'
            });
        });
        */
}

function makeOutput() {
    var theData = []
    var outMessage = []

    var type = document.getElementById('typeSel').value

    theData[0] = document.getElementById('typeSel').value

    if (type === 'Note On') {
        theData[1] = 'ch:' + document.getElementById('chSel').value
        theData[2] = document.getElementById('noteSel').value
        theData[3] = document.getElementById('velSel').value

        outMessage[0] = (144 + document.getElementById('chSel').value - 1)
        outMessage[1] = theData[2]
        outMessage[2] = theData[3]
    } else if (type === 'Note Off') {
        theData[1] = 'ch:' + document.getElementById('chSel').value
        theData[2] = document.getElementById('noteSel').value
        theData[3] = document.getElementById('velSel').value

        outMessage[0] = (128 + document.getElementById('chSel').value - 1)
    } else if (type === 'Control Change') {
        theData[1] = 'ch:' + document.getElementById('chSel').value
        theData[2] = document.getElementById('ccSel').value
        theData[3] = document.getElementById('ccValSel').value
    } else if (type === 'Program Change') {
        theData[1] = 'ch:' + document.getElementById('chSel').value
        theData[2] = document.getElementById('pgmSel').value
    } else if (type === 'Sys Ex') {
        theData[1] = 'HEX:' + document.getElementById('chSel').value
    } else if (type === 'Song Select') {
        theData[1] = 'Song:' + document.getElementById('songSel').value
    } else if (type === 'Start') {
        theData[1] = 'startnull'
    } else if (type === 'Continue') {
        theData[1] = 'Continuenull'
    } else if (type === 'Stop') {
        theData[1] = 'stopnull'
    } else if (type === 'System Reset') {
        theData[1] = 'sysRSTnull'
    }



    return [theData, outMessage]
}

function setOutput(outputData) {
    var body = document.getElementById('outputArea')
    body.innerHTML = outputData[0]

    body = document.getElementById('msgOut')
    body.innerHTML = outputData[1]
}

function createSelect(id, pckrName, data) {
    var body = document.getElementById(id)
    body.innerHTML = ''
    var select = document.createElement('select')

    if (pckrName !== undefined) {
        select.setAttribute('id', pckrName)
        if (pckrName === 'typeSel') {
            select.setAttribute('onChange', 'populatePicker()')
        }
    }
    for (var i = 0; i < data.length; i++) {
        var opt = document.createElement('option')
        opt.innerHTML = data[i]
        select.appendChild(opt)
    }
    body.appendChild(select)
}

function clear(id) {
    var body = document.getElementById(id)
    body.innerHTML = ''
}

function createLabel(id, label) {
    var body = document.getElementById(id)
    body.innerHTML = label
}

function clearRow(byte) {
    if (byte === 0) {
        clear('byte0Lbl')
        clear('byte0Div')
    } else if (byte === 1) {
        clear('byte1Lbl')
        clear('byte1Div')
    } else if (byte === 2) {
        clear('byte2Lbl')
        clear('byte2Div')
    }
}

function clearRows(rows) {
    for (var i = 0; i < rows.length; i++) {
        clearRow(rows[i])
    }
}

function drawChRow() {
    createLabel('byte0Lbl', 'Channel:')
    createSelect('byte0Div', 'chSel', range16)
}

export default outputCmdPicker
