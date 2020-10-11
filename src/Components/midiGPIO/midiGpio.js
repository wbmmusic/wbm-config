import React, { useState, useEffect } from 'react'
import MidiGpioChannel from './midiGpioChannel'
import { MidiGpioChannelProvider } from './MidiGpioChannelContext'
import NameInput from '../utilities/NameInput'

const { ipcRenderer } = window.require('electron')

export default function MidiGpio() {
    let state = {
        numberOfChannels: 6,
        channels: []
    }

    let deviceName = 'Name Me'

    const [savedSanpshot, setsavedSanpshot] = useState(state)

    const openFromFile = (event, arg) => {
        //console.log('GOT DATA FROM OPEN')
        let data = JSON.parse(arg)
        //console.log(data)
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
                <div key={'gpioChannelDiv' + i} style={{ display: 'inline-block' }}>
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
        //console.log('OPEN btn press')
        ipcRenderer.send('fileOpen', 'wbmgpio')
    }

    const saveBtnPress = () => {
        console.log('SAVE btn press')
        ipcRenderer.send('fileSave', 'wbmgpio', state)
    }

    const saveAsBtnPress = () => {
        //console.log('SAVE AS btn press')
        console.log(state)
        ipcRenderer.send('fileSaveAs', 'wbmgpio', JSON.stringify(state))
    }

    const seeState = () => {
        console.log(state)
    }

    const setdeviceName = (newName) => {
        
    }

    return (
        <div>
            <div style={{
                backgroundColor: 'darkgrey',
                paddingBottom: '4px'
            }}>
                <b style={{ display: 'block' }}>MIDI GPIO</b>
                <NameInput value={deviceName} setValue={setdeviceName} />
                <table style={{ display: 'inline-block', paddingLeft: '6px' }}>
                    <tbody>
                        <tr>
                            <td>
                                <div className="opensavebtns"
                                    onMouseDown={openBtnPress}
                                >Open</div>
                            </td>
                            <td>
                                <div className="opensavebtns"
                                    onMouseDown={saveBtnPress}
                                >Save</div>
                            </td>
                            <td>
                                <div className="opensavebtns"
                                    onMouseDown={saveAsBtnPress}
                                >Save As</div>
                            </td>
                            <td>
                                <div className="opensavebtns"
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