import React, { Component } from 'react'
const { ipcRenderer } = window.require('electron')

export class Files extends Component {
    render() {
        return (
            <div>
                <button style={{ margin: '10px 4px' }} id="btn1" onClick={openx}>OPEN</button>
                <button style={{ margin: '10px 4px' }} id="btn2" onClick={save}>SAVE</button>
                <br />
                <textarea
                    style={inp}
                    id="textInput"
                    defaultValue="Type something in here | Then save it |  Then open it"
                >
                </textarea>
            </div>
        )
    }
}

function openx() {
    console.log('OPEN')
    ipcRenderer.send('OPEN', 'OPEN REQUEST FROM RENDERER')
}

function save() {
    console.log('SAVE')
    var input = document.getElementById('textInput')
    ipcRenderer.send('SAVE', 'SAVE REQUEST FROM RENDERER', input.value)
    //ipcRenderer.send('TEST', 'This is a test message')
}

/*
ipcRenderer.on('asynchronous-reply', (event, arg) => {
    var input = document.getElementById('textInput')
    console.log('Reading File') // prints "pong"
    input.value = ''
    input.value = arg
})


ipcRenderer.on('itSaved', (event, arg) => {
    var input = document.getElementById('textInput')
    console.log(arg) // prints "pong"
    input.value = ''
})
*/

const inp = {
    width: 'calc(100vw - 80px)',
    height: 'calc(100vh - 180px)',
    padding: '10px',
}

export default Files
