import React, { Component } from 'react'
import $ from 'jquery'

export class midiGpioIO extends Component {
    handleClick = (e) => {
        console.log('this is:', e);
    }

    render() {
        return (
            <div>
                I/O Section
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td style={td}>IN/OUT:</td>
                            <td style={td}>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td><div style={iobtn}>IN</div></td>
                                            <td><div style={iobtn}>OUT</div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style={td}>TS/TRS:</td>
                            <td style={td}>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td><div style={iobtn}>TS</div></td>
                                            <td><div style={iobtn}>TRS</div></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onMouseDown={this.handleClick}>Click me</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        )
    }
}

const iobtn = {
    border: '1px blue solid',
    padding: '0px 6px',
    backgroundColor: 'lightblue',
    displey: 'inline-block',
}

const td = {
    border: '1px black solid'
}

export default midiGpioIO
