import React, { Component } from 'react'
import MidiLightChannel from './midiLightChannel'
import { v4 as uuid } from 'uuid';

const { ipcRenderer } = window.require('electron')

console.log('XXXX MIDI LIGHT TOP')

export class midiLight extends Component {
    constructor(props) {
        super(props)
        //console.log('XXXX MIDI LIGHT TOP Constructor')

        this.state = {
            numberOfChannels: 6,
            channelData: []
        }
    }

    openBtnPress = () => {
        console.log('OPEN btn press')
        ipcRenderer.send('fileOpen', 'wbmlight')
    }

    saveBtnPress = () => {
        console.log('SAVE btn press')
        ipcRenderer.send('fileSave', 'wbmlight', this.state)
    }

    saveAsBtnPress = () => {
        console.log('SAVE AS btn press')
        ipcRenderer.send('fileSaveAs', 'wbmlight', JSON.stringify(this.state))
    }

    seeState = () => {
        console.log(this.state)
    }

    getChanelInfo = (chnl, e) => {
        //console.log('XXX LIGHT CH STRUCTURE #' + chnl)
        var tempState = this.state.channelData
        tempState[chnl - 1] = e
        //console.log(e)
        this.setState({ channelData: tempState })
    }

    componentDidMount() {
        ipcRenderer.on('asynchronous-reply', (event, arg) => {
            console.log('GOT DATA FROM OPEN')
            var data = JSON.parse(arg)

            this.setState(data)
            console.log(data)
        })
    }

    createTable = () => {
        let table = []
        // Outer loop to create parent
        for (let i = 0; i < this.state.numberOfChannels; i++) {
            //Create the parent and add the children
            //console.log('XXX make chnl #' + (i + 1))
            table.push(
                <div
                    style={{
                        display: 'inline-block'
                    }}
                    channel={(i + 1)}
                >
                    <MidiLightChannel
                        getChanelInfo={this.getChanelInfo}
                        statex={this.state.channelData[i]}
                        id={'gpiochnl' + (i + 1)}
                        channel={(i + 1)}
                    />
                </div>
            )
        }
        return table
    }

    render() {
        return (
            <div>
                <b style={{ display: 'block' }}>MIDI Light</b>
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
                {this.createTable()}
            </div>
        )
    }
}


const openSaveBtns = {
    backgroundColor: 'grey',
    padding: '4px',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'context-menu'
}

export default midiLight
