import React, { Component } from 'react'
import Select from 'react-select'
import { v4 as uuid } from 'uuid';
//import $ from 'jquery'
//import ReactDOM from 'react-dom'

export class outputCmdPicker extends Component {
    state = {
        id: 'picker',
        type: ['Note On', 0],
        channel: 11,
        byte1: 67,
        byte2: 127,
    }

    render() {
        return (
            <div style={mainDiv}>
                <table id="pickerTable" style={{ width: "100%" }}>
                <col width="1px" />
                    <tbody style={{ width: "100%" }}>
                        <tr>
                            <td colSpan="2" style={pickerTitle}>Command Picker</td>
                        </tr>
                        <tr>
                            <td style={td}>
                                <div id="typeLbl" style={label}>Type:</div>
                            </td>
                            <td style={td}>
                                <div id="typeDiv">
                                    <Select
                                        key={uuid()}
                                        hideResetButton='true'
                                        style={{ textAlign: 'left' }}
                                        options={typesDropDown}
                                        defaultValue={{
                                            label: this.state.type[0],
                                            value: this.state.type[1]
                                        }}
                                        theme="default"
                                        onValueChange={() => { }}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={td}>
                                <div id="byte0Lbl" style={label}>CH:</div>
                            </td>
                            <td style={td}>
                                <div id="byte0Div">
                                    <Select
                                        id={uuid()}
                                        hideResetButton='true'
                                        style={{ textAlign: 'left' }}
                                        options={oneSixteen}
                                        defaultValue={{
                                            label: this.state.channel,
                                            value: this.state.channel,
                                        }}
                                        theme="default"
                                        onValueChange={() => { }}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={td}>
                                <div id="byte1Lbl" style={label}>Note:</div>
                            </td>
                            <td style={td}>
                                <div id="byte1Div">
                                    <Select
                                        id={uuid()}
                                        hideResetButton='true'
                                        style={{ textAlign: 'left' }}
                                        options={noteDropDown}
                                        defaultValue={{
                                            label: noteDropDown[this.state.byte1].label,
                                            value: noteDropDown[this.state.byte1].value,
                                        }}
                                        theme="default"
                                        onValueChange={() => { }}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={td}>
                                <div id="byte2Lbl" style={label}>Vel:</div>
                            </td>
                            <td style={td}>
                                <div id="byte2Div">
                                    <Select
                                        id={uuid()}
                                        hideResetButton='true'
                                        style={{ textAlign: 'left' }}
                                        options={one127}
                                        defaultValue={{
                                            label: this.state.byte2,
                                            value: this.state.byte2 - 1,
                                        }}
                                        theme="default"
                                        onValueChange={() => { }}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
    //border: '1px black solid',
    padding: '2px',
    textAlign: 'center',
}

const label = {
    textAlign: 'right',
    paddingLeft: '5px'
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
    range16[i] = (i+1)
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
}

export default outputCmdPicker
