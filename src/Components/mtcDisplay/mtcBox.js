import React, { Component } from 'react'
import MtcDisplay from './mtcDisplay'

export class mtcBox extends Component {
    state = {
        frameRate: '29.97 drop'
    }
    render() {
        return (
            <div style={{
                padding: '20px',
                margin: '0 auto'
            }}>
                <b style={{ display: 'block' }}>MTC Display</b>
                <br></br>
                <div>
                    <MtcDisplay />
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

export default mtcBox
