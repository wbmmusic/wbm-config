import React, { Component } from 'react'
import { v4 as uuid } from 'uuid';

const { ipcRenderer } = window.require('electron')


export class serial extends Component {
    state = {
        portsx: []
    }

    fillLine = (port) => {
        //console.log('fill line')
        serports.push(<p key={uuid()}>{port}</p>)
        this.setState({ portsx: serports })
    }

    componentDidMount() {
        ipcRenderer.send('ports', 'give me')

        ipcRenderer.on('port', (e, arg) => {
            console.log('Recv Port From Main')
            console.log(arg)
            this.fillLine(arg)
        });


    }


    render() {
        return (
            <div>
                <br />
                <b>PORTS</b>
                <br />
                <ul style={{
                    textAlign: "left",
                    paddingRight: '50px',
                    backgroundColor: "lightgrey",
                    display: "inline-block"
                }}>
                    {this.state.portsx}
                </ul>
            </div>
        )

    }
}

let serports = []

export default serial
