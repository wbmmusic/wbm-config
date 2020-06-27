import React, { Component } from 'react'
import OutputCmdPicker, { defaultStateData } from './../utilities/outputCmdPicker'
import InputCommandPicker from "./../utilities/inputCommandPicker";

export class midiGpioChannel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            channel: this.props.channel,
            in: false,
            trs: false,
            pickRing: false,
            tipPickerData: defaultStateData('tip'),
            ringPickerData: defaultStateData('ring'),
        }

        //console.log('GPIO CH CONSTRUCTOR #' + this.props.channel)

        this.inPress = this.inPress.bind(this);
        this.outPress = this.outPress.bind(this);
        this.tsPress = this.tsPress.bind(this);
        this.trsPress = this.trsPress.bind(this);
        this.tipSel = this.tipSel.bind(this);
        this.ringSel = this.ringSel.bind(this);

        this.getStructure = this.getStructure.bind(this);
    }

    printState = () => {
        console.log(this.state)
    }

    getStructure = (chnl, e) => {
        console.log('XXX GOT STRUCTURE #' + chnl)
        console.log(chnl)
        console.log(e)

        if (chnl === 'tip') {
            console.log('GPIO CH #' + this.state.channel + ' Tip Data Change')
            var tipTemp = this.state
            tipTemp.tipPickerData = e
            this.setState({ tipPickerData: e })
            this.props.getChanelInfo(this.state.channel, tipTemp)

        } else if (chnl === 'ring') {
            console.log('GPIO CH #' + this.state.channel + ' Ring Data Change')
            var ringTemp = this.state
            ringTemp.ringPickerData = e
            this.setState({ ringPickerData: e })
            this.props.getChanelInfo(this.state.channel, ringTemp)
        }
    }

    componentDidMount() {
        if (this.props.getChanelInfo !== undefined) {
            if (this.state !== this.props.statex) {
                this.props.getChanelInfo(this.state.channel, this.state)
            }
        }

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.statex !== prevState) {
            return nextProps.statex;
        }
        else return null;
    }

    inPress = (e) => {
        console.log('IN PRESS')
        this.setState({ in: true })

        if (this.props.getChanelInfo !== undefined) {
            var inPressTemp = this.state
            inPressTemp.in = true
            this.props.getChanelInfo(this.state.channel, inPressTemp)
        }
    }

    outPress = (e) => {
        console.log('OUT PRESS')
        this.setState({ in: false })

        if (this.props.getChanelInfo !== undefined) {
            var inPressTemp = this.state
            inPressTemp.in = false
            this.props.getChanelInfo(this.state.channel, inPressTemp)
        }
    }

    tsPress = (e) => {
        console.log('TS PRESS')
        this.setState({ trs: false })
        this.setState({ pickRing: false })

        if (this.props.getChanelInfo !== undefined) {
            var tsPressTemp = this.state
            tsPressTemp.trs = false
            tsPressTemp.pickRing = false
            this.props.getChanelInfo(this.state.channel, tsPressTemp)
        }

    }

    trsPress = (e) => {
        console.log('TRS PRESS')
        this.setState({ trs: true })
        this.setState({ pickRing: false })

        if (this.props.getChanelInfo !== undefined) {
            var trsPressTemp = this.state
            trsPressTemp.trs = true
            trsPressTemp.pickRing = false
            this.props.getChanelInfo(this.state.channel, trsPressTemp)
        }
    }

    tipSel = (e) => {
        console.log('TIP Selected')
        this.setState({ pickRing: false })

        if (this.props.getChanelInfo !== undefined) {
            var tipSelTemp = this.state
            tipSelTemp.pickRing = false
            this.props.getChanelInfo(this.state.channel, tipSelTemp)
        }
    }

    ringSel = (e) => {
        if (this.state.trs) {
            console.log('Ring Selected')
            this.setState({ pickRing: true })

            if (this.props.getChanelInfo !== undefined) {
                var ringSelTemp = this.state
                ringSelTemp.pickRing = true
                this.props.getChanelInfo(this.state.channel, ringSelTemp)
            }
        }
    }

    render() {
        let pickerDisplay
        let rngBtn

        if (this.state.trs) {
            rngBtn = 'RING'
        } else {
            rngBtn = ''
        }

        if (this.state.pickRing) {
            if (this.state.in) {
                pickerDisplay = [
                    <InputCommandPicker />
                ]
            } else {
                pickerDisplay = [
                    <OutputCmdPicker
                        getStructure={this.getStructure}
                        statex={this.state.ringPickerData}
                        channel={'ring'}
                    />
                ]
            }


        } else {
            if (!this.state.in) {
                pickerDisplay = [
                    <InputCommandPicker />
                ]
            } else {
                pickerDisplay = [
                    <OutputCmdPicker
                        getStructure={this.getStructure}
                        statex={this.state.tipPickerData}
                        channel={'tip'}
                    />
                ]
            }

        }

        return (
            <div style={{ width: '300px' }}>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td style={{
                                textAlign: 'center',
                                fontSize: '14px'
                            }}>
                                <b>I/O #{this.state.channel}</b>
                                <br />
                                <button style={{ borderRadius: '4px' }} onMouseDown={this.printState.bind(this)}>STATE</button>
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
                                                    style={
                                                        {
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
                                                {pickerDisplay}
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

const btnTd = {
    padding: '1.5px 3px'
}

export default midiGpioChannel
