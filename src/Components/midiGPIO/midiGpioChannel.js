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
                    key={uuid()}
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

        if (this.state.trs) {
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
    }

    render() {
        return (
            <div style={{ width: '300px' }}>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr key={uuid()}>
                            <td style={{
                                textAlign: 'center',
                                fontSize: '14px'
                            }}>
                                <b>I/O #{this.state.channel}</b>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ fontSize: '12px' }}>In/Out</td>
                                            <td style={btnTd}>
                                                <div
                                                    onMouseDown={this.inPress}
                                                    style={{
                                                        cursor: 'context-menu',
                                                        padding: '2px',
                                                        border: '0',
                                                        borderRadius: '4px',
                                                        width: "100%",
                                                        backgroundColor: this.state.in ? 'lightgreen' : 'white',
                                                        fontSize: '12px'
                                                    }}>
                                                    IN
                                                </div>
                                            </td>
                                            <td style={btnTd}>
                                                <div
                                                    onMouseDown={this.outPress}
                                                    style={{
                                                        cursor: 'context-menu',
                                                        padding: '2px',
                                                        border: '0',
                                                        borderRadius: '4px',
                                                        width: "100%",
                                                        backgroundColor: this.state.in ? 'white' : 'lightgreen',
                                                        fontSize: '12px'
                                                    }}>
                                                    OUT
                                                </div>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontSize: '12px' }}>TS/TRS</td>
                                            <td style={btnTd}>
                                                <div
                                                    onMouseDown={this.tsPress}
                                                    style={{
                                                        cursor: 'context-menu',
                                                        padding: '2px',
                                                        border: '0',
                                                        borderRadius: '4px',
                                                        width: "100%",
                                                        backgroundColor: this.state.trs ? 'white' : 'lightgreen',
                                                        fontSize: '12px'
                                                    }}>
                                                    TS
                                                </div>
                                            </td>
                                            <td style={btnTd}>
                                                <div
                                                    onMouseDown={this.trsPress}
                                                    style={{
                                                        cursor: 'context-menu',
                                                        padding: '2px',
                                                        border: '0',
                                                        borderRadius: '4px',
                                                        width: "100%",
                                                        backgroundColor: this.state.trs ? 'lightgreen' : 'white',
                                                        fontSize: '12px'
                                                    }}>
                                                    TRS
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div
                                                    style={{
                                                        padding: '2px',
                                                        border: '0',
                                                        borderRadius: '4px',
                                                        cursor: 'context-menu',
                                                        backgroundColor: this.state.pickRing ? 'white' : 'lightgreen',
                                                        fontSize: '12px'
                                                    }}
                                                    onMouseDown={this.tipSel}>
                                                    TIP

                                                </div>

                                            </td>
                                            <td>
                                                <div
                                                    style={{
                                                        padding: '2px',
                                                        border: '0',
                                                        borderRadius: '4px',
                                                        cursor: 'context-menu',
                                                        backgroundColor: this.state.pickRing ? 'lightgreen' : 'white',
                                                        fontSize: '12px'
                                                    }}
                                                    onMouseDown={this.ringSel}>
                                                    {rngBtn}

                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
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

const btnTd={
    padding: '1.5px 3px'
}

export default midiGpioChannel
