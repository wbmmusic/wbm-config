import React, { Component } from 'react'
import OutputCmdPicker, { defaultStateData } from './../utilities/outputCmdPicker'
import { v4 as uuid } from 'uuid';

export class midiGpioChannel extends Component {
    state = {
        channel: '',
        in: false,
        trs: false,
        pickerDisplay: [],
        pickRing: false,
        tipPickerData: defaultStateData('tip'),
        ringPickerData: defaultStateData('ring'),
    }

    constructor(props) {
        super(props)
        this.setState({ channel: this.props.channel })
        this.inPress = this.inPress.bind(this);
        this.outPress = this.outPress.bind(this);
        this.tsPress = this.tsPress.bind(this);
        this.trsPress = this.trsPress.bind(this);
        this.tipSel = this.tipSel.bind(this);
        this.ringSel = this.ringSel.bind(this);

        this.getStructure = this.getStructure.bind(this);

        var temp = this.state.ringPickerData
        temp.channel = 5
        this.setState({ ringPickerData: temp })
    }

    getStructure = (chnl, e) => {
        console.log('XXX GOT STRUCTURE #' + chnl)

        if (chnl === 'tip') {
            console.log('GPIO CH #' + this.state.channel + ' Tip Data Change')
            this.setState({ tipPickerData: e })
        } else if (chnl === 'ring') {
            console.log('GPIO CH #' + this.state.channel + ' Ring Data Change')
            this.setState({ ringPickerData: e })
        }

        this.setState({ pickerData: e })

    }

    componentDidMount() {
        this.setState({ channel: this.props.channel })
        this.setState({
            pickerDisplay: [
                <OutputCmdPicker
                    getStructure={this.getStructure}
                    statex={this.state.tipPickerData}
                    channel={this.state.channel}
                />
            ]
        })
    }

    inPress = (e) => {
        console.log('IN PRESS')
        this.setState({ in: true })
    }

    outPress = (e) => {
        console.log('OUT PRESS')
        this.setState({ in: false })
    }

    tsPress = (e) => {
        console.log('TS PRESS')
        this.setState({ trs: false })
        this.setState({ pickRing: false })
        rngBtn = ''
        this.tipSel()
    }

    trsPress = (e) => {
        console.log('TRS PRESS')
        this.setState({ trs: true })
        rngBtn = 'RING'
    }

    tipSel = (e) => {
        console.log('TIP Selected')
        this.setState({
            pickerDisplay: [
                <OutputCmdPicker
                    getStructure={this.getStructure}
                    statex={this.state.tipPickerData}
                    channel={this.state.channel}
                    id={uuid()}
                    key={uuid()}
                />
            ]
        })
        this.setState({ pickRing: false })
    }

    ringSel = (e) => {
        console.log('Ring Selected')
        this.setState({
            pickerDisplay: [
                <OutputCmdPicker
                    getStructure={this.getStructure}
                    statex={this.state.ringPickerData}
                    channel={this.state.channel}
                    id={uuid()}
                    key={uuid()}
                />
            ]
        })
        this.setState({ pickRing: true })
    }

    render() {
        return (
            <div style={{ width: '300px' }}>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr key={uuid()}>
                            <td style={tblcell}>
                                <b>I/O #{this.state.channel}</b>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td>In/Out</td>
                                            <td>
                                                <button
                                                    onMouseDown={this.inPress}
                                                    style={{
                                                        width: "100%",
                                                        backgroundColor: this.state.in ? 'green' : 'white'
                                                    }}>
                                                    IN
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    onMouseDown={this.outPress}
                                                    style={{
                                                        width: "100%",
                                                        backgroundColor: this.state.in ? 'white' : 'green'
                                                    }}>
                                                    OUT
                                                </button>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>TS/TRS</td>
                                            <td>
                                                <button
                                                    onMouseDown={this.tsPress}
                                                    style={{
                                                        width: "100%",
                                                        backgroundColor: this.state.trs ? 'white' : 'green'
                                                    }}>
                                                    TS
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    onMouseDown={this.trsPress}
                                                    style={{
                                                        width: "100%",
                                                        backgroundColor: this.state.trs ? 'green' : 'white'
                                                    }}>
                                                    TRS
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table style={{ width: '100%', border: '1px solid black' }}>
                                    <tbody>
                                        <tr>
                                            <td
                                                style={{
                                                    cursor: 'context-menu',
                                                    border: '1px solid black',
                                                    backgroundColor: this.state.pickRing ? 'white' : 'lightgreen'
                                                }}
                                                onMouseDown={this.tipSel}>
                                                TIP
                                                </td>
                                            <td
                                                style={{
                                                    cursor: 'context-menu',
                                                    border: '1px solid black',
                                                    backgroundColor: this.state.pickRing ? 'lightgreen' : 'white'
                                                }}
                                                onMouseDown={this.ringSel}>
                                                {rngBtn}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                {this.state.pickerDisplay}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div >
        )
    }
}

let rngBtn

const tblcell = {
    textAlign: 'center',
}

export default midiGpioChannel
