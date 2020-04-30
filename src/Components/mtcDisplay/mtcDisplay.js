import React, { Component } from 'react'

export class mtcDisplay extends Component {
    state = {
        time: 'The Time',
        hours: '',
        minutes: '',
        seconds: '',
        frames: ''
    }

    componentDidMount() {
        setInterval(() => {
            // current timestamp in milliseconds
            let ts = Date.now();
            let date_ob = new Date(ts);

            //console.log(date_ob)
            if (date_ob !== this.state.time) {
                this.setState({ time: date_ob })
                let hour = date_ob.getHours().toString();
                let min = date_ob.getMinutes().toString();
                let sec = date_ob.getSeconds().toString();
                let frame = Math.round(date_ob.getMilliseconds() / 34).toString();

                if (hour.length === 1) {
                    hour = 0 + hour
                }
                if (min.length === 1) {
                    min = 0 + min
                }
                if (sec.length === 1) {
                    sec = 0 + sec
                }
                if (frame.length === 1) {
                    frame = 0 + frame
                } else if (frame.length > 2) {
                    frame = '00'
                }

                this.setState({ hours: hour })
                this.setState({ minutes: min })
                this.setState({ seconds: sec })
                this.setState({ frames: frame })
            }
        }, 50);
    }

    render() {
        return (
            <div className="mainDiv" style={{
                border: '2px black solid',
                display: 'inline-block'
            }}>
                <table>
                    <tbody>
                        <tr>
                            <td className="hourCell" style={digitsCell}>
                                <b>{this.state.hours}</b>
                            </td>
                            <td style={spacer}>
                                <b>:</b>
                            </td>
                            <td className="minuteCell" style={digitsCell}>
                                <b>{this.state.minutes}</b>
                            </td>
                            <td style={spacer}>
                                <b>:</b>
                            </td>
                            <td className="secondCell" style={digitsCell}>
                                <b>{this.state.seconds}</b>
                            </td>
                            <td style={spacer}>
                                <b>:</b>
                            </td>
                            <td className="frameCell" style={digitsCell}>
                                <b>{this.state.frames}</b>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const digitsCell = {
    //border: '2px black solid',
    width: '110px',
    fontSize: '80px',
}

const spacer = {
    //border: '2px black solid',
    fontSize: '80px',
    paddingBottom: '15px',
}

export default mtcDisplay
