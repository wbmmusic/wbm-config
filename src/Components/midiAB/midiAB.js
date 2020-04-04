import React, { Component } from 'react'

export class midiAB extends Component {
    render() {
        return (
            <div>
                <b style={{display: 'block'}}>MIDI A/B</b>
                <table style={{ width: '100%', height: '100px', border: '2px black solid' }}>
                    <tbody>
                        <tr>
                            <td style={{ border: '2px black solid' }}></td>
                            <td style={{ border: '2px black solid' }}></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default midiAB
