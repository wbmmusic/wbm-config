import React, { Component } from 'react'

export class mtcDisplay extends Component {
    render() {
        return (
            <div>
                <b style={{display: 'block'}}>MTC Display</b>
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

export default mtcDisplay
