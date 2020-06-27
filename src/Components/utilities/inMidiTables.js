export const numberOfInputs = 8

export const typesDropDown = () => {
    const allTypes = ['None', 'Note On', 'Note Off', 'Control Change',
        'Program Change', 'Sys Ex', 'Song Select', 'Start',
        'Continue', 'Stop', 'System Reset'
    ]
    return createOptions(allTypes)
}

export const inputTypesDropDown = () => {
    const inTypes = ['None', 'Note Off', 'Note On', 'Control Change',
        'Program Change', 'Pitch Bend', 'Sys Ex', 'MTC', 'Song Select', 'Start',
        'Continue', 'Stop', 'System Reset'
    ]
    return createOptions(inTypes)
}

export const one127 = () => {
    let range127 = []
    for (var i = 0; i < 128; i++) {
        range127[i] = i
    }

    return createOptions(range127)
}

export const noteDropDown = () => {
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
        noteNames.push('ANY')
    }
    return createOptions(noteNames)
}

export const oneSixteen = () => {
    let range16 = []
    for (var i = 0; i < 17; i++) {
        if (i <= 15) {
            range16[i] = (i + 1)
        } else {
            range16[i] = 'Any'
        }

    }
    return createOptions(range16)
}

export const inputs = () => {
    let inputNums = []
    for (var i = 0; i < numberOfInputs; i++) {
        inputNums[i] = (i + 1)
    }
    return createOptions(inputNums)
}

export const ccDropDown = () => {
    let ccNames = []
    const ccNameList = ["Bank Select", "Mod Wheel or Lever", "Breath Ctrl",
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
    for (var i = 0; i < 128; i++) {
        ccNames[i] = i + ' - ' + ccNameList[i]
    }

    return createOptions(ccNames)
}

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