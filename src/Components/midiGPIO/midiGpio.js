import React, { useState, useEffect } from 'react'
import MidiGpioChannel from './midiGpioChannel'
import { MidiGpioChannelProvider } from './MidiGpioChannelContext'

const { ipcRenderer } = window.require('electron')

export default function MidiGpio() {
    let state = {
        numberOfChannels: 6,
        channels: []
    }

    const [savedSanpshot, setsavedSanpshot] = useState(state)

    const openFromFile = (event, arg) => {
        console.log('GOT DATA FROM OPEN')
        let data = JSON.parse(arg)
        console.log(data)
        setsavedSanpshot(data)
    }

    useEffect(() => {
        ipcRenderer.on('asynchronous-reply', openFromFile)
        return () => {
            console.log('GPIO CLEANUP')
            ipcRenderer.removeListener('asynchronous-reply', openFromFile)
        }
    }, [])

    const createChannels = () => {
        let table = []
        // Outer loop to create parent
        for (let i = 0; i < state.numberOfChannels; i++) {
            table.push(
                <div key={'gpioChannelDiv' + i} style={chnl}>
                    <MidiGpioChannelProvider key={'gpioChannelProvider' + i}>
                        <MidiGpioChannel
                            snapshot={savedSanpshot.channels[i]}
                            key={'gpioChannel' + i}
                            statex={state.channels[i]}
                            getChanelInfo={getChanelInfo}
                            channel={i + 1}
                            id={i + 1}
                        />
                    </MidiGpioChannelProvider>
                </div>
            )
        }
        return table
    }

    const getChanelInfo = (chnl, e) => {
        //console.log('XXX GPIO CH STRUCTURE #' + chnl)
        state.channels[chnl - 1] = e
    }

    const openBtnPress = () => {
        console.log('OPEN btn press')
        ipcRenderer.send('fileOpen', 'wbmgpio')
    }

    const saveBtnPress = () => {
        console.log('SAVE btn press')
        ipcRenderer.send('fileSave', 'wbmgpio', state)
    }

    const saveAsBtnPress = () => {
        console.log('SAVE AS btn press')
        console.log(state)
        ipcRenderer.send('fileSaveAs', 'wbmgpio', JSON.stringify(state))
    }

    const seeState = () => {
        console.log(state)
    }

    return (
        <div>
            <div style={{
                backgroundColor: 'darkgrey',
                paddingBottom: '4px'
            }}>
                <b style={{ display: 'block' }}>MIDI GPIO</b>
                <table style={{ display: 'inline-block', paddingLeft: '6px', userSelect: 'none' }}>
                    <tbody>
                        <tr>
                            <td>
                                <div style={openSaveBtns}
                                    onMouseDown={openBtnPress}
                                >Open</div>
                            </td>
                            <td>
                                <div style={openSaveBtns}
                                    onMouseDown={saveBtnPress}
                                >Save</div>
                            </td>
                            <td>
                                <div style={openSaveBtns}
                                    onMouseDown={saveAsBtnPress}
                                >Save As</div>
                            </td>
                            <td>
                                <div style={openSaveBtns}
                                    onMouseDown={seeState}
                                >STATE</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {createChannels()}
        </div>
    )
}


const chnl = {
    backgroundColor: 'darkgrey',
    display: 'inline-block',
    padding: '3px',
    border: '1px solid grey',
    boxShadow: '1px 1px 6px',
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