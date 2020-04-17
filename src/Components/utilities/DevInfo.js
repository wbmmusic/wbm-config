import React, { Component } from 'react'
const { ipcRenderer } = window.require('electron')

export class DevInfo extends Component {
    render() {
        return (
            <div>
                Dev Info
            </div>
        )
    }
}

ipcRenderer.send('showDevs')

ipcRenderer.on('devList', (event, arg) => {
    console.log('HERE IS YOUR DATA MAN')
    console.log(arg)
  })

export default DevInfo
