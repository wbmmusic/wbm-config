import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

const { ipcRenderer } = window.require('electron')

export default function DevInfo() {
    const defaultState = {
        list: []
    }

    const [state, setstate] = useState(defaultState)

    var deviceEvent = (event, devList) => {
        makeDevTabel(devList)
    }

    useEffect(() => {
        ipcRenderer.on('devList', deviceEvent)
        ipcRenderer.send('showDevs')
        return () => {
            ipcRenderer.removeListener('devList', deviceEvent)
        }
    }, [])

    const makeDevTabel = (devList) => {
        //console.log('IN MAKE DEV TBL')
        //console.log(devList)

        let deviceInfo = []
        let tempState = { ...state }

        if (devList.length === 0) {
            deviceInfo = <b>No Devices</b>
        } else {
            deviceInfo = []
            for (var i = 0; i < devList.length; i++) {
                deviceInfo.push(
                    <b key={uuid()}>{devList[i].info.Model} | {devList[i].info.UserName} | {devList[i].info.serialNumber}</b>
                )
                deviceInfo.push(<br key={uuid()} />)
            }
        }

        tempState.list = deviceInfo
        setstate(tempState)
    }

    return (
        <div>
            <h2>Device Info</h2>
            {state.list}
        </div>
    )
}
