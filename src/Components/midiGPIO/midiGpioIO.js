import React, { Component } from 'react'
import { v4 as uuid } from 'uuid';

export class midiGpioIO extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 'IOselect',
            channel: this.props.channel,
            inColor: 'red',
            in: false,
            trs: false,
            outButton: [],
            inButton: [],
            trsButton: [],
            tsButton: []
        }

        this.handleIoInclick = this.handleIoInclick.bind(this);
        this.handleIoOutclick = this.handleIoOutclick.bind(this);
        this.handleTSclick = this.handleTSclick.bind(this);
        this.handleTRSclick = this.handleTRSclick.bind(this);
    }

    componentDidMount() {
        this.setState({ channel: this.state.channel })
        this.setIO()
        this.setTSTRS()
    }

    componentDidUpdate() {
        if (lastIO !== this.state.in) {
            this.setIO()
            lastIO = this.state.in
        }

        if (lastTSTRS !== this.state.trs) {
            this.setTSTRS()
            lastTSTRS = this.state.trs
        }
    }

    setIO = () => {
        console.log('SetIO ch' + this.state.channel)
        this.setState({
            outButton: [
                <div
                    key={uuid()}
                    id={"outBtn" + this.state.channel}
                    channel={this.state.channel}
                    onMouseDown={this.handleIoOutclick}
                    style={{
                        border: '1px blue solid',
                        padding: '0px 6px',
                        cursor: 'context-menu',
                        backgroundColor: this.state.in ? 'white' : 'red'
                    }}>
                    OUT
                </div>
            ]
        })

        this.setState({
            inButton: [
                <div
                    key={uuid()}
                    id={"inBtn" + this.state.channel}
                    channel={this.state.channel}
                    onMouseDown={this.handleIoInclick}
                    style={{
                        border: '1px blue solid',
                        padding: '0px 6px',
                        cursor: 'context-menu',
                        backgroundColor: this.state.in ? 'red' : 'white'
                    }}>
                    IN
                </div>
            ]
        })
    }

    setTSTRS = () => {
        console.log('SetTSTRS ch' + this.state.channel)
        this.setState({
            trsButton: [
                <div
                    key={uuid()}
                    id={"trsBtn"}
                    channel={this.state.channel}
                    onMouseDown={this.handleTRSclick}
                    style={{
                        border: '1px blue solid',
                        padding: '0px 6px',
                        cursor: 'context-menu',
                        backgroundColor: this.state.trs ? 'red' : 'white'
                    }}>
                    TRS
                </div>
            ]
        })

        this.setState({
            tsButton: [
                <div
                    key={uuid()}
                    id={"tsBtn"}
                    channel={this.state.channel}
                    onMouseDown={this.handleTSclick}
                    style={{
                        border: '1px blue solid',
                        padding: '0px 6px',
                        cursor: 'context-menu',
                        backgroundColor: this.state.trs ? 'white' : 'red'
                    }}>
                    TS
                </div>
            ]
        })
    }

    handleIoInclick = (e) => {
        console.log('In Click')
        this.setState({ in: true })
        this.setIO()
    }

    handleIoOutclick = (e) => {
        console.log('Out Click')
        this.setState({ in: false })
        this.setIO()
    }

    handleTSclick = (e) => {
        console.log(e.target)
        this.setState({ trs: false })
        this.setTSTRS()
    }

    handleTRSclick = (e) => {
        console.log(e.target)
        this.setState({ trs: true })
        this.setTSTRS()
    }



    render() {



        return (
            <div key={uuid()}>
                I/O Section
                <table key={uuid()} style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td style={td}>IN/OUT:</td>
                            <td style={td}>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {this.state.inButton}
                                            </td>
                                            <td>
                                                {this.state.outButton}
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
                                                {this.state.tsButton}
                                            </td>
                                            <td>
                                                {this.state.trsButton}
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

let lastIO
let lastTSTRS

const td = {
    border: '1px black solid'
}

export default midiGpioIO
