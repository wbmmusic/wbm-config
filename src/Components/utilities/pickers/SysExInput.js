import React, { useState } from 'react'

export default function SysExInput(props) {
    const [sysexText, setsysexText] = useState(props.text)

    function handleSysex(e) {
        let tempName = e.target.value
        let charsAreLegal = true

        for (var i = 0; i < tempName.length; i++) {
            var code = tempName.charCodeAt(i)
            if (
                (code >= 48 && code <= 57)
                ||
                (code >= 97 && code <= 102)
                ||
                (code >= 65 && code <= 70)
                ||
                code === 120 || code === 88
                ||
                code === 32 || code === 44
            ) {

            } else {
                charsAreLegal = false
                break
            }
        }

        if (charsAreLegal) {
            setsysexText(e.target.value)
        } else {
            console.log('SysEx Data Input Error')
        }

    }

    return (
        <textarea
            value={sysexText}
            onChange={handleSysex}
            style={{
                resize: 'none',
                width: '100%',
                height: '150px'
            }}
        />
    )
}
