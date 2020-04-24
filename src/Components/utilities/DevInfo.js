import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

const { ipcRenderer } = window.require('electron')

export class DevInfo extends Component {
    state = {
        list: []
    }

    constructor(props) {
        super(props)
        ipcRenderer.send('showDevs')
        ipcRenderer.on('devList', (event, devList) => {
            this.makeDevTabel(devList)
        })

        this.makeDevTabel = this.makeDevTabel.bind(this)
    }

    makeDevTabel = (devList) => {
        console.log('IN MAKE DEV TBL')
        console.log(devList)
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

        this.setState({ list: deviceInfo })
    }

    render() {
        console.log('Info Render')
        return (
            <div>
                <h2>Device Info</h2>
                {deviceInfo}
            </div>
        )
    }
}

let deviceInfo = <b>No Devices</b>

export default DevInfo
