import React, { useState, useEffect, Fragment } from 'react'

export default function MTCinput(props) {
    const rates = ['24fps', '25fps', '29.97fps', '30fps']

    const [hour, sethour] = useState('00')
    const [minute, setminute] = useState('00')
    const [second, setsecond] = useState('00')
    const [frame, setframe] = useState('00')
    const [frameRate, setframeRate] = useState(rates[3])

    useEffect(() => {
        //Send Data Up Here
        props.sendMtc(frameRate, hour, minute, second, frame)
        return () => {
            //cleanup
        }
    })

    const makeTwo = (id, input) => {
        var isNum = isNaN(input)
        let out = input

        if (out.length >= 3) {
            //console.log('Too Long')
            out = out.substr(out.length - 2)
        }

        switch (id) {
            case 'hour':
                if (isNum) {
                    out = hour
                } else {
                    if (parseInt(out) >= 24) {
                        out = '23'
                    }
                }
                return out

            case 'min':
                if (isNum) {
                    out = minute
                } else {
                    if (parseInt(out) >= 60) {
                        out = '59'
                    }
                }
                return out

            case 'sec':
                if (isNum) {
                    out = second
                } else {
                    if (parseInt(out) >= 60) {
                        out = '59'
                    }
                }
                return out

            case 'frame':
                if (isNum) {
                    out = frame
                } else {
                    if (parseInt(out) >= 25) {
                        out = '24'
                    }
                }
                return out

            default:
                break;
        }


    }

    const handleChange = (e) => {

        switch (e.target.id) {
            case 'hour':
                sethour(makeTwo(e.target.id, e.target.value))
                break;

            case 'min':
                setminute(makeTwo(e.target.id, e.target.value))
                break;

            case 'sec':
                setsecond(makeTwo(e.target.id, e.target.value))
                break;

            case 'frame':
                setframe(makeTwo(e.target.id, e.target.value))
                break;

            default:
                break;
        }
    }

    const makeFrameRateButtons = () => {
        const out = []


        for (var i = 0; i < rates.length; i++) {
            let theRate = rates[i]
            var fpsStyle = {
                width: '25%',
                backgroundColor: 'white',
                padding: '2px',
                borderRadius: '3px',
                border: '1px solid black',
                userSelect: 'none'
            }

            if (frameRate === theRate) {
                fpsStyle.backgroundColor = 'lightgreen'
            }

            out.push(<td key={'fpsBtn' + i + props.channel} style={fpsStyle} onMouseDown={() => setframeRate(theRate)}>{theRate}</td>)
        }

        return out
    }
    //console.log('RENDER')
    return (
        <div style={{ width: '100%' }}>
            <table style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        {makeFrameRateButtons()}
                    </tr>
                    <tr>
                        <td colSpan="4" style={{ alignItems: 'center' }}>
                            <div
                                style={{
                                    display: 'inline-block',
                                    marginTop: '10px',
                                    backgroundColor: 'lightgrey',
                                    padding: '8px',
                                    borderRadius: '3px',
                                    boxShadow: 'inset 1px 1px 4px',
                                    border: '1px solid black'
                                }}
                            >
                                <table>
                                    <tbody>
                                        <tr>
                                            <td
                                                style={inStyle}
                                            >
                                                <input
                                                    style={inStyle}
                                                    id="hour"
                                                    type="text"
                                                    value={hour}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                            <td>:</td>
                                            <td

                                            >
                                                <input
                                                    style={inStyle}
                                                    id="min"
                                                    type="text"
                                                    value={minute}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                            <td>:</td>
                                            <td
                                                style={inStyle}
                                            >
                                                <input
                                                    style={inStyle}
                                                    id="sec"
                                                    type="text"
                                                    value={second}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                            <td>:</td>
                                            <td
                                                style={inStyle}
                                            >
                                                <input
                                                    style={inStyle}
                                                    id="frame"
                                                    type="text"
                                                    value={frame}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={labStyle}
                                            >
                                                HR
                                            </td>
                                            <td style={labStyle}>:</td>
                                            <td
                                                style={labStyle}
                                            >
                                                MIN
                                            </td>
                                            <td style={labStyle}>:</td>
                                            <td
                                                style={labStyle}
                                            >
                                                SEC
                                            </td>
                                            <td style={labStyle}>:</td>
                                            <td
                                                style={labStyle}
                                            >
                                                FRM
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}



const inStyle = {
    width: '20px',
    textAlign: 'center'
}

const labStyle = {
    textAlign: 'center',
    fontSize: '10px'
}
