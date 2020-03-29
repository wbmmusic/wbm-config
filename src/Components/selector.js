import React, { Component } from 'react'
import { SimpleSelect } from 'react-selectize';


export class selector extends Component {
    render() {
        const elements = ['one', 'two', 'three', 'five', 'six', 'seven', "eight"];
        const allTypes = ['Note On', 'Note Off', 'Control Change',
            'Program Change', 'Sys Ex', 'Song Select', 'Start',
            'Continue', 'Stop', 'System Reset'
        ]
        const ccNameList = ["Bank Select", "Modulation Wheel or Lever", "Breath Controller",
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

        var noteNames = []
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

        var range127 = []
        for (i = 0; i < 128; i++) {
            range127[i] = i
        }

        var range16 = []
        for (i = 0; i < 16; i++) {
            range16[i] = (i + 1)
        }

        var ccNames = []
        for (i = 0; i < 128; i++) {
            ccNames[i] = i + ' - ' + ccNameList[i]
        }

        var items = []

        for (const [value, label] of ccNames.entries()) {
            items.push({ label, value })
        }

        for (var i = 0; i < items.length; i++) {
            items[i].label = String(items[i].label)
        }

        console.log(items)

        return (
            <SimpleSelect
                options={items}
                placeholder="Select a Note"
                theme="default"
                onValueChange={() => { }}
            />
        )
    }
}

export default selector
