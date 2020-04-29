import React, { Component } from 'react'
import Select from 'react-select'

export function defaultStateData(id) {
    //console.log('YOYOYO' + id)
    const defaultState =
    {
        id: 'picker' + id,
        parentCh: id,
        type: ['None', 0],
        command: 154,
        channel: 11,
        byte0: 154,
        byte1: 67,
        byte2: 127,
        showByte0: true,
        showByte1: true,
        showByte2: true,
        hexOutput: [],
        sysex: 'Enter HEX data here'
    }
    return defaultState
}

export class outputCmdPicker extends Component {


    constructor(props) {
        super(props)
        this.state = this.props.statex
        //console.log('XXXX Picker Constructor #' + thisPickersChannel)

        if (props.statex === undefined) {
            //console.log('XXXA No State Def in Picker ' + this.props.channel)
            this.state = defaultStateData('')
            this.setState({ parentCh: this.props.channel })

        } else {
            //console.log('XXXA State Deffined in Picker ' + this.props.channel)
            this.setState(props.statex)
            this.setState({ parentCh: this.props.channel })
        }

        this.enterSysex = this.enterSysex.bind(this)
    }

    enterSysex(e) {
        console.log(e.target.value)
        this.setState({ sysex: e.target.value })

        if (this.props.getStructure !== undefined) {
            let tempSysEx = this.state
            tempSysEx.sysex = e.target.value
            this.props.getStructure(this.state.parentCh, tempSysEx)
        }

    }

    componentDidMount() {
        if (this.props.getStructure !== undefined) {
            if (this.props.statex !== this.state) {
                this.props.getStructure(this.state.parentCh, this.state)
            }
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.statex !== prevState) {
            return nextProps.statex;
        }
        else return null;
    }

    componentWillUnmount() {
        console.log('PICKER UNMOUNT')
    }

    makeCmd = (type, chnl) => {
        let tmpCmd = 'Hello'
        let wasGood = true

        if (type === 'Note On') {
            tmpCmd = 144 + chnl
        } else if (type === 'Note Off') {
            tmpCmd = 128 + chnl
        } else if (type === 'Control Change') {
            tmpCmd = 176 + chnl
        } else if (type === 'Program Change') {
            tmpCmd = 192 + chnl
        } else if (type === 'Sys Ex') {
            tmpCmd = 'SYSEX'
        } else if (type === 'Song Select') {
            tmpCmd = 243
        } else if (type === 'Start') {
            tmpCmd = 250
        } else if (type === 'Continue') {
            tmpCmd = 251
        } else if (type === 'Stop') {
            tmpCmd = 252
        } else if (type === 'System Reset') {
            tmpCmd = 255
        } else {
            wasGood = false
            console.log('ERROR - Command Picker makeCmd didnt recognize this command type ' + type)
        }

        if (wasGood) {
            this.setState({ command: tmpCmd })
        }

        return tmpCmd
    }

    render() {
        let byte0data = []
        let byte1data = []
        let byte2data = []
        let b0lbl = []
        let b1lbl = []
        let b2lbl = []
        let outputDisplay = []

        if (this.state.type[0] === 'Note On' || this.state.type[0] === 'Note Off' || this.state.type[0] === 'Control Change') {
            //console.log('NOn NOf CC')
            outputDisplay = [
                decimalToHexString(this.state.command), ' | ',
                decimalToHexString(this.state.byte1), ' | ',
                decimalToHexString(this.state.byte2)
            ]
            if (!this.state.showByte0 || !this.state.showByte1 || !this.state.showByte2) {
                //console.log('Setting States')
                this.setState((state) => {


                    if (this.props.getStructure !== undefined) {
                        let tempSetShowBytes = this.state

                        tempSetShowBytes.showByte0 = true
                        tempSetShowBytes.showByte1 = true
                        tempSetShowBytes.showByte2 = true

                        this.props.getStructure(this.state.parentCh, tempSetShowBytes)
                    }

                    return {
                        showByte0: true,
                        showByte1: true,
                        showByte2: true
                    }
                })
            }
        } else if (this.state.type[0] === 'Program Change' || this.state.type[0] === 'Song Select') {
            //console.log('PC SYSEX SS')
            if (this.state.type[0] === 'Song Select') {
                outputDisplay = [
                    decimalToHexString(this.state.command), ' | ',
                    decimalToHexString(this.state.byte0)
                ]
            } else {
                outputDisplay = [
                    decimalToHexString(this.state.command), ' | ',
                    decimalToHexString(this.state.byte1)
                ]
            }
            if (!this.state.showByte0 || !this.state.showByte1 || this.state.showByte2) {
                console.log('Setting States')
                b2lbl = []
                this.setState((state) => {

                    if (this.props.getStructure !== undefined) {
                        let tempSetShowBytes = this.state

                        tempSetShowBytes.showByte0 = true
                        tempSetShowBytes.showByte1 = true
                        tempSetShowBytes.showByte2 = false

                        this.props.getStructure(this.state.parentCh, tempSetShowBytes)
                    }
                    return {
                        showByte0: true,
                        showByte1: true,
                        showByte2: false
                    }
                })
            }
        } else if (this.state.type[0] === 'Sys Ex') {
            //console.log('PC SYSEX SS')
            outputDisplay = [
                decimalToHexString(this.state.command)
            ]
            if (this.state.showByte0 === false || this.state.showByte1 === true || this.state.showByte2 === true) {
                //console.log('Setting States')
                b1lbl = []
                b2lbl = []
                this.setState((state) => {

                    if (this.props.getStructure !== undefined) {
                        let tempSetShowBytes = this.state

                        tempSetShowBytes.showByte0 = true
                        tempSetShowBytes.showByte1 = false
                        tempSetShowBytes.showByte2 = false

                        this.props.getStructure(this.state.parentCh, tempSetShowBytes)
                    }

                    return {
                        showByte0: true,
                        showByte1: false,
                        showByte2: false
                    }


                })
            }
        } else if (this.state.type[0] === 'System Reset' || this.state.type[0] === 'Start' ||
            this.state.type[0] === 'Continue' || this.state.type[0] === 'Stop') {
            //console.log('SYS RST START CONT STOP')
            outputDisplay = [
                decimalToHexString(this.state.command)
            ]
            if (this.state.showByte0 || this.state.showByte1 || this.state.showByte2) {
                //console.log('Setting States')
                b0lbl = []
                b1lbl = []
                b2lbl = []
                this.setState((state) => {


                    if (this.props.getStructure !== undefined) {
                        let tempSetShowBytes = this.state

                        tempSetShowBytes.showByte0 = false
                        tempSetShowBytes.showByte1 = false
                        tempSetShowBytes.showByte2 = false

                        this.props.getStructure(this.state.parentCh, tempSetShowBytes)
                    }

                    return {
                        showByte0: false,
                        showByte1: false,
                        showByte2: false
                    }
                })
            }
        }

        if (this.state.showByte0) {
            if (this.state.type[0] === 'Note On' ||
                this.state.type[0] === 'Note Off' ||
                this.state.type[0] === 'Control Change' ||
                this.state.type[0] === 'Program Change') {
                b0lbl = ['CH:']
                byte0data = [
                    <Select
                        styles={styles}
                        hideResetButton='true'
                        style={{ textAlign: 'left' }}
                        options={oneSixteen}
                        value={{
                            label: this.state.channel,
                            value: this.state.channel,
                        }}
                        theme="default"
                        onChange={(e) => {
                            this.setState({ channel: e.value + 1 })
                            this.makeCmd(this.state.type[0], e.value)

                            if (this.props.getStructure !== undefined) {
                                let tempChChange = this.state
                                tempChChange.channel = e.value + 1
                                tempChChange.command = this.makeCmd(this.state.type[0], e.value)
                                this.props.getStructure(this.state.parentCh, tempChChange)
                            }
                        }}
                    />
                ]
            } else if (this.state.type[0] === 'Song Select') {
                b0lbl = ['Song:']
                let point = this.state.byte0
                if (point > 127) {
                    point = 0
                }
                byte0data = [
                    <Select
                        styles={styles}
                        hideResetButton='true'
                        style={{ textAlign: 'left' }}
                        options={one127}
                        value={{
                            label: one127[point].label,
                            value: one127[point].value,
                        }}
                        theme="default"
                        onChange={(e) => {
                            this.setState({ byte0: e.value })

                            if (this.props.getStructure !== undefined) {
                                let tempSongChange = this.state
                                tempSongChange.byte0 = e.value
                                this.props.getStructure(this.state.parentCh, tempSongChange)
                            }
                        }}
                    />
                ]
            } else if (this.state.type[0] === 'Sys Ex') {
                b0lbl = ['DATA:']
                byte0data = [
                    <input
                        type='text'
                        onChange={this.enterSysex}
                        value={this.state.sysex}
                        style={{ width: '97%' }}
                    ></input>
                ]
            } else {
                b0lbl = []
                byte0data = []
            }

        } else {
            b0lbl = []
            byte0data = []
        }

        if (this.state.showByte1) {
            if (this.state.type[0] === 'Note On' || this.state.type[0] === 'Note Off') {
                b1lbl = ['Note:']
                byte1data = [
                    <Select
                        styles={styles}
                        hideResetButton='true'
                        style={{ textAlign: 'left' }}
                        options={noteDropDown}
                        value={{
                            label: noteDropDown[this.state.byte1].label,
                            value: noteDropDown[this.state.byte1].value,
                        }}
                        theme="default"
                        onChange={(e) => {
                            this.setState({ byte1: e.value })

                            if (this.props.getStructure !== undefined) {
                                let tempNoteChange = this.state
                                tempNoteChange.byte1 = e.value
                                this.props.getStructure(this.state.parentCh, tempNoteChange)
                            }
                        }}
                    />
                ]
            } else if (this.state.type[0] === 'Control Change') {
                b1lbl = ['CC#:']
                byte1data = [
                    <Select
                        styles={styles}
                        hideResetButton='true'
                        style={{ textAlign: 'left' }}
                        options={ccDropDown}
                        value={{
                            label: ccDropDown[this.state.byte1].label,
                            value: ccDropDown[this.state.byte1].value,
                        }}
                        theme="default"
                        onChange={(e) => {
                            this.setState({ byte1: e.value })

                            if (this.props.getStructure !== undefined) {
                                let tempCcChange = this.state
                                tempCcChange.byte1 = e.value
                                this.props.getStructure(this.state.parentCh, tempCcChange)
                            }
                        }}
                    />
                ]
            } else if (this.state.type[0] === 'Program Change') {
                b1lbl = ['PGM#:']
                byte1data = [
                    <Select
                        styles={styles}
                        hideResetButton='true'
                        style={{ textAlign: 'left' }}
                        options={one127}
                        value={{
                            label: one127[this.state.byte1].label,
                            value: one127[this.state.byte1].value,
                        }}
                        theme="default"
                        onChange={(e) => {
                            this.setState({ byte1: e.value })

                            if (this.props.getStructure !== undefined) {
                                let tempPgmChange = this.state
                                tempPgmChange.byte1 = e.value
                                this.props.getStructure(this.state.parentCh, tempPgmChange)
                            }
                        }}
                    />
                ]
            } else {
                b1lbl = []
                byte1data = []
            }

        } else {
            b1lbl = []
            byte1data = []
        }

        if (this.state.showByte2) {
            if (this.state.type[0] === 'Note On' || this.state.type[0] === 'Note Off') {
                b2lbl = ['Vel:']
                byte2data = [
                    <Select
                        styles={styles}
                        hideResetButton='true'
                        style={{ textAlign: 'left' }}
                        options={one127}
                        value={{
                            label: this.state.byte2,
                            value: this.state.byte2 - 1,
                        }}
                        theme="default"
                        onChange={(e) => {
                            this.setState({ byte2: e.value })

                            if (this.props.getStructure !== undefined) {
                                let tempVelChange = this.state
                                tempVelChange.byte2 = e.value
                                this.props.getStructure(this.state.parentCh, tempVelChange)
                            }
                        }}
                    />
                ]
            } else if (this.state.type[0] === 'Control Change') {
                console.log('IN HERE CC YUP ch: ' + this.props.channel)
                b2lbl = ['Val:']
                byte2data = [
                    <Select
                        styles={styles}
                        hideResetButton='true'
                        style={{ textAlign: 'left' }}
                        options={one127}
                        value={{
                            label: this.state.byte2,
                            value: this.state.byte2 - 1,
                        }}
                        theme="default"
                        onChange={(e) => {
                            this.setState({ byte2: e.value })

                            if (this.props.getStructure !== undefined) {
                                let tempValChange = this.state
                                tempValChange.byte2 = e.value
                                this.props.getStructure(this.state.parentCh, tempValChange)
                            }
                        }}
                    />
                ]
            } else {
                b2lbl = []
                byte2data = []
            }


        } else {
            b2lbl = []
            byte2data = []
        }

        return (
            <div style={mainDiv}>
                <table id={"pickerTable" + this.props.channel} style={{ width: "100%" }}>
                    <colgroup>
                        <col width="1px" />
                    </colgroup>
                    <tbody style={{ width: "100%" }}>
                        <tr>
                            <td colSpan="2" style={pickerTitle}>
                                Command Picker
                            </td>
                        </tr>
                        <tr>
                            <td style={td}>
                                <div id="typeLbl" style={label}>Type:</div>
                            </td>
                            <td style={td}>
                                <div id="typeDiv">
                                    <Select
                                        styles={styles}
                                        hideResetButton='true'
                                        style={{ textAlign: 'left' }}
                                        options={typesDropDown}
                                        value={{
                                            label: this.state.type[0],
                                            value: this.state.type[1]
                                        }}
                                        theme="default"
                                        onChange={(e) => {
                                            console.log('HHHEEERRRRREEEEE')
                                            console.log(e)
                                            this.setState({ type: [e.label, e.value] })
                                            this.makeCmd(e.label, this.state.channel - 1)
                                            if (this.props.getStructure !== undefined) {
                                                let tempTypeChange = this.state
                                                tempTypeChange.type = [e.label, e.value]
                                                tempTypeChange.command = this.makeCmd(e.label, this.state.channel - 1)
                                                this.props.getStructure(this.state.parentCh, tempTypeChange)
                                            }
                                        }}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={td}>
                                <div id="byte0Lbl" style={label}>{b0lbl}</div>
                            </td>
                            <td style={td}>
                                <div id="byte0Div">
                                    {byte0data}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={td}>
                                <div id="byte1Lbl" style={label}>{b1lbl}</div>
                            </td>
                            <td style={td}>
                                <div id="byte1Div">
                                    {byte1data}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={td}>
                                <div id="byte2Lbl" style={label}>{b2lbl}</div>
                            </td>
                            <td style={td}>
                                <div id="byte2Div">
                                    {byte2data}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {outputDisplay}
            </div>
        )
    }
}

function decimalToHexString(number) {
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }
    return number.toString(16).toUpperCase();
}

const mainDiv = {
    backgroundColor: 'lightgrey',
    padding: '8px',
    maxWidth: '500px',
    borderRadius: '10px',
    margin: '4px',
    fontSize: '12px'
}

const td = {
    border: '1px black solid',
}

const pickerTitle = {
    //border: '1px black solid',
    padding: '2px',
    textAlign: 'center',
}

const styles = {
    control: base => ({
        ...base,
        fontSize: '12px',
        minHeight: '15px'
    }),
    menu: base => ({
        ...base,
        fontSize: '12px'
    }),
    dropdownIndicator: base => ({
        ...base,
        padding: '0px 8px'
    }),
    valueContainer: base => ({
        ...base,
        padding: '0px 8px'
    })
};

const label = {
    textAlign: 'right',
    paddingLeft: '5px',
    fontSize: '12px'
}

var allTypes = ['None', 'Note On', 'Note Off', 'Control Change',
    'Program Change', 'Sys Ex', 'Song Select', 'Start',
    'Continue', 'Stop', 'System Reset'
]

var ccNameList = ["Bank Select", "Mod Wheel or Lever", "Breath Ctrl",
    "Undefined", "Foot Ctrl", "Portamento Time", "Data Entry MSB",
    "Channel Vol (Main Vol)", "Balance", "Undefined", "Pan",
    "Expression Ctrl", "FX Ctrl 1", "FX Ctrl 2", "Undefined",
    "Undefined", "Gen Purp Ctrl 1", "Gen Purp Ctrl 2",
    "Gen Purp Ctrl 3", "Gen Purp Ctrl 4", "Undefined",
    "Undefined", "Undefined", "Undefined", "Undefined", "Undefined", "Undefined",
    "Undefined", "Undefined", "Undefined", "Undefined", "Undefined",
    "LSB Ctrl 0 (Bank Select)", "LSB Ctrl 1 (Mod Wheel or Lever)",
    "LSB Ctrl 2 (Breath Ctrl)", "LSB Ctrl 3 (Undefined)",
    "LSB Ctrl 4 (Foot Ctrl)", "LSB Ctrl 5 (Portamento Time)",
    "LSB Ctrl 6 (Data Entry)", "LSB Ctrl 7 (Ch Vol, Main Vol)",
    "LSB Ctrl 8 (Balance)", "LSB Ctrl 9 (Undefined)", "LSB Ctrl 10 (Pan)",
    "LSB Ctrl 11 (Expression Ctrl)", "LSB Ctrl 12 (FX Ctrl 1)",
    "LSB Ctrl 13 (FX Ctrl 2)", "LSB Ctrl 14 (Undefined)",
    "LSB Ctrl 15 (Undefined)", "LSB Ctrl 16 (Gen Purp Ctrl 1)",
    "LSB Ctrl 17 (Gen Purp Ctrl 2)",
    "LSB Ctrl 18 (Gen Purp Ctrl 3)",
    "LSB Ctrl 19 (Gen Purp Ctrl 4)",
    "LSB Ctrl 20 (Undefined)", "LSB Ctrl 21 (Undefined)",
    "LSB Ctrl 22 (Undefined)", "LSB Ctrl 23 (Undefined)",
    "LSB Ctrl 24 (Undefined)", "LSB Ctrl 25 (Undefined)",
    "LSB Ctrl 26 (Undefined)", "LSB Ctrl 27 (Undefined)",
    "LSB Ctrl 28 (Undefined)", "LSB Ctrl 29 (Undefined)",
    "LSB Ctrl 30 (Undefined)", "LSB Ctrl 31 (Undefined)",
    "Damper Pedal on/off (Sustain)", "Portamento On/Off", "Sostenuto On/Off",
    "Soft Pedal On/Off", "Legato Footswitch", "Hold 2",
    "Sound Ctrl 1 (Sound Variation)",
    "Sound Ctrl 2 (Timbre/Harmonic Intens.)",
    "Sound Ctrl 3 (Release Time)", "Sound Ctrl 4 (Attack Time)",
    "Sound Ctrl 5 (Brightness)",
    "Sound Ctrl 6 (Decay Time)",
    "Sound Ctrl 7 (Vibrato Rate)",
    "Sound Ctrl 8 (Vibrato Depth)",
    "Sound Ctrl 9 (Vibrato Delay)",
    "Sound Ctrl 10 (default undefined)",
    "Gen Purp Ctrl 5", "Gen Purp Ctrl 6", "Gen Purp Ctrl 7",
    "Gen Purp Ctrl 8", "Portamento Ctrl", "Undefined", "Undefined", "Undefined",
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
    "[CMM] Reset All Ctrls",
    "[CMM] Local Ctrl On/Off", "[CMM] All Notes Off",
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

let ccDropDown = createOptions(ccNames)

let oneSixteen = createOptions(range16)

let noteDropDown = createOptions(noteNames)

let one127 = createOptions(range127)

let typesDropDown = createOptions(allTypes)

function createOptions(pointer) {
    let output = []
    for (const [value, label] of pointer.entries()) {
        output.push({ label, value })
    }

    for (var i = 0; i < output.length; i++) {
        output[i].label = String(output[i].label)
    }

    return output
}

export default outputCmdPicker
