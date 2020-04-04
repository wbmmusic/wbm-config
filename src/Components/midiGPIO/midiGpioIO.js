import React, { Component } from 'react'

export class midiGpioIO extends Component {
    state = {
        inColor: 'red'
    }

    handleIoInclick = () => {
        console.log('In Click')
    }

    handleIoOutclick = () => {
        console.log('Out Click')
    }

    handleTSclick = () => {
        console.log('TS Click')
    }

    handleTRSclick = () => {
        console.log('TRS Click')
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
                                            <td>
                                                <div
                                                    onMouseDown={this.handleIoInclick}
                                                    style={iobtn}>
                                                    IN
                                                    </div>
                                            </td>
                                            <td>
                                                <div
                                                    onMouseDown={this.handleIoOutclick}
                                                    style={iobtn}>
                                                    OUT
                                                    </div>
                                            </td>
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
                                            <td>
                                                <div
                                                    onMouseDown={this.handleTSclick}
                                                    style={iobtn}>
                                                    TS
                                                    </div>
                                            </td>
                                            <td>
                                                <div
                                                    onMouseDown={this.handleTRSclick}
                                                    style={iobtn}>
                                                    TRS
                                                    </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
    displey: 'inline-block',
    cursor: 'context-menu'
}

const td = {
    border: '1px black solid'
}

export default midiGpioIO
