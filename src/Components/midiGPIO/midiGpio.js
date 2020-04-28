import React, { Component } from 'react'
import MidiGpioChannel from './midiGpioChannel'

const { ipcRenderer } = window.require('electron')

export class midiGpio extends Component {


    constructor(props) {
        super(props)
        this.state = {
            numberOfChannels: 6,
            channelData: []
        }

        this.getChanelInfo = this.getChanelInfo.bind(this)
    }


    openBtnPress = () => {
        console.log('OPEN btn press')
        ipcRenderer.send('fileOpen', 'wbmgpio')
    }

    saveBtnPress = () => {
        console.log('SAVE btn press')
        ipcRenderer.send('fileSave', 'wbmgpio', this.state)
    }

    saveAsBtnPress = () => {
        console.log('SAVE AS btn press')
        ipcRenderer.send('fileSaveAs', 'wbmgpio', JSON.stringify(this.state))
    }

    seeState = () => {
        console.log(this.state)
    }

    componentDidUpdate() {
        console.log('TOP GPIO UPDATE')
        //console.log(this.state)
    }

    componentWillUnmount() {
        console.log('GPIO TOP UNMOUNT')
    }

    componentDidMount() {
        ipcRenderer.on('asynchronous-reply', (event, arg) => {
            console.log('GOT DATA FROM OPEN')
            var data = JSON.parse(arg)

            this.setState(data)
            console.log(data)
        })
    }

    getChanelInfo = (chnl, e) => {
        console.log('XXX GPIO CH STRUCTURE #' + chnl)
        var tempState = this.state.channelData
        tempState[chnl - 1] = e
        //console.log(e)
        this.setState({ channelData: tempState })
    }

    createTable = () => {
        let table = []
        // Outer loop to create parent
        for (let i = 0; i < this.state.numberOfChannels; i++) {
            //Create the parent and add the children

            //console.log(this.state)
            table.push(
                <div style={chnl}>
                    <MidiGpioChannel
                        statex={this.state.channelData[i]}
                        getChanelInfo={this.getChanelInfo}
                        channel={i + 1}
                        id={i + 1}
                    />
                </div>
            )
        }
        return table
    }

    render() {
        let channels = this.createTable()

        return (
            <div>
                <b style={{ display: 'block' }}>MIDI GPIO</b>
                <table style={{ display: 'block', paddingLeft: '6px' }}>
                    <tbody>
                        <tr>
                            <td>
                                <div style={openSaveBtns}
                                    onMouseDown={this.openBtnPress}
                                >Open</div>
                            </td>
                            <td>
                                <div style={openSaveBtns}
                                    onMouseDown={this.saveBtnPress}
                                >Save</div>
                            </td>
                            <td>
                                <div style={openSaveBtns}
                                    onMouseDown={this.saveAsBtnPress}
                                >Save As</div>
                            </td>
                            <td>
                                <div style={openSaveBtns}
                                    onMouseDown={this.seeState}
                                >STATE</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {channels}
            </div>
        )
    }
}


const chnl = {
    backgroundColor: 'darkgrey',
    display: 'inline-block',
    padding: '3px',
    border: '2px black solid',
    margin: '3px',
    borderRadius: "10px",
}

const openSaveBtns = {
    backgroundColor: 'grey',
    padding: '4px',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'context-menu'
}

export default midiGpio
