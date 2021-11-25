import React, { Component } from 'react'
import MtcDisplay from './mtcDisplay'

export class MtcBox extends Component {
    state = {
        frameRate: '29.97 drop',
        hours: '',
        minutes: '',
        seconds: '',
        frames: '',
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
            <div style={{
                padding: '20px',
                margin: '0 auto',
                textAlign: 'center',
                backgroundColor:'grey'
            }}>
                <b style={{ display: 'block' }}>MTC Display</b>
                <br></br>
                <div>
                    <MtcDisplay
                        hours={this.state.hours}
                        minutes={this.state.minutes}
                        seconds={this.state.seconds}
                        frames={this.state.frames}
                    />
                </div>
                <div style={{
                    //border: '1px black solid',
                    display: 'inline-block'
                }}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    Rate:
                                </td>
                                <td>
                                    {this.state.frameRate}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default MtcBox
