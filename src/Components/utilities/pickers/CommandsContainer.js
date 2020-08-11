import React, { Fragment, useState, useEffect } from 'react'
import InputCommand from './inputPicker/InputCommand'
import { v4 as uuid } from 'uuid';
import NameInput from '../NameInput';
import InputCommandPicker from './inputPicker/InputCommandPicker';
import OutputCommandPicker from './outputPicker/OutputCommandPicker';

export default function CommandsContainer(props) {
    const [commands, setcommands] = useState(props.commands)

    const [showPicker, setshowPicker] = useState({
        id: '',
        true: false
    })

    useEffect(() => {
        props.sendCommands(commands)
    }, [commands])

    useEffect(() => {
        setcommands(props.commands)
    }, [props.commands])

    const setPickerData = (idx, data) => {

        for (var i = 0; i < commands.length; i++) {
            if (commands[i].id === idx) {
                console.log('--------Got A Match at ' + i)
                let tempCmd = [...commands]
                tempCmd[i].pickerData = data
                setcommands(tempCmd)
                return;
            }
        }
        console.log('No Match')
    }

    const handleShowCommands = () => {
        console.log(commands)
    }

    const handleNameChange = (id, newName) => {
        for (var i = 0; i < commands.length; i++) {
            if (commands[i].id === id) {

                let tempCommands = [...commands]
                tempCommands[i].commandName = newName
                setcommands(tempCommands)
                break
            }
        }
    }

    const removeHandle = (id) => {
        /*
            var checknsee = window.confirm("You are about to delete this command!")
            if (checknsee === true) {
                setCommands(commands.filter(item => item.id !== id))
            }
        */
        let tempCommands = [...commands]
        tempCommands = tempCommands.filter(item => item.id !== id)
        setcommands(tempCommands)
    }

    const handleAdd = () => {
        let tempCommands = [...commands]
        let theid = uuid()
        tempCommands.push({
            id: theid,
            commandName: Math.floor(Math.random(0) * 100000) + 1,
            pickerData: {}
        })
        setcommands(tempCommands)
    }

    const handleShowPicker = (id) => {
        //console.log('In Handle Show Picker ' + id)
        setshowPicker({
            id: id,
            true: true
        })
    }

    const handleReturnToList = () => {
        //console.log('In Handle Return To List')
        setshowPicker({
            id: '',
            true: false
        })
    }

    const showList = () => {
        let direction = 'No direction prop'
        if (props.direction === 'in') {
            direction = 'Input Commands'
        } else if (props.direction === 'out') {
            direction = 'Output Commands'
        }


        return (
            <Fragment>
                <div style={redBar}>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td style={{ fontSize: '12px' }}>
                                    {direction}
                                </td>
                                <td style={{ width: '30px' }}>
                                    <div
                                        style={{
                                            backgroundColor: 'lightgrey',
                                            padding: '3px',
                                            border: '1px solid black',
                                            borderRadius: '3px',
                                        }}
                                        onClick={handleAdd}
                                    >
                                        <span
                                            style={{ fontSize: '12px' }}
                                            aria-label="add command"
                                            role="img"
                                        >➕</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div
                    style={{
                        height: '300px',
                        width: '100%',
                        overflowY: 'scroll',
                        display: 'inline-block',
                        backgroundColor: 'white',
                        fontSize: '12px'
                    }}
                >
                    <table style={{ width: '100%' }}>
                        <tbody>
                            {commands.map((item, idx) => (
                                <tr key={item.id}>
                                    <td>
                                        <InputCommand
                                            id={item.id}
                                            idx={idx}
                                            commandData={commands[idx].pickerData}
                                            commandName={item.commandName}
                                            remove={removeHandle}
                                            showPicker={handleShowPicker}
                                            nameChange={handleNameChange}
                                        />
                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </Fragment>
        )
    }

    const tempCommand = () => { return commands.filter(cmd => cmd.id === showPicker.id) }

    const showCommandPicker = () => {
        let thePicker = []


        const handleNameChange2 = (newName) => {
            console.log('Name Change ' + newName)
            console.log(tempCommand()[0].id)

            for (var i = 0; i < commands.length; i++) {
                if (commands[i].id === tempCommand()[0].id) {
                    console.log('GOT A MATCH')
                    let tempCommands = [...commands]
                    tempCommands[i].commandName = newName
                    setcommands(tempCommands)
                    break
                }
            }
        }

        if (props.direction === 'in') {
            thePicker = (<InputCommandPicker id={showPicker.id} data={tempCommand()[0]} sendData={setPickerData} />)
        } else if (props.direction === 'out') {
            thePicker = (<OutputCommandPicker id={showPicker.id} data={tempCommand()[0]} sendData={setPickerData} />)
        } else {
            console.log('No direction prop')
        }

        return (
            <Fragment>
                <div
                    style={redBar}
                >
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td style={{ fontSize: '12px' }}>
                                    <NameInput value={tempCommand()[0].commandName} setValue={handleNameChange2} />
                                </td>
                                <td style={{ width: '30px' }}>
                                    <div
                                        style={{
                                            backgroundColor: 'lightgrey',
                                            padding: '3px',
                                            border: '1px solid black',
                                            borderRadius: '3px',
                                        }}
                                        onClick={handleReturnToList}
                                    >
                                        <span
                                            style={{ fontSize: '12px' }}
                                            aria-label="add command"
                                            role="img"
                                        >◀️</span>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    {thePicker}
                </div>
                <div
                    style={{
                        fontSize: '12px',
                        backgroundColor: 'lightgrey',
                        borderRadius: '3px',
                        padding: '2px'
                    }}
                >
                    {showPicker.id}
                </div>
            </Fragment>
        )
    }

    const makeBody = () => {
        if (!showPicker.true) {
            return showList()
        } else {
            return showCommandPicker()
        }
    }

    return (
        <div
            style={{
                display: 'inline-block',
                width: '100%',
                borderRadius: '10px',
                backgroundColor: 'lightgrey',
                border: '1px solid grey',
                boxShadow: 'inset 1px 1px 6px'
            }}
        >
            <div style={{ margin: '8px' }}>
                {makeBody()}
                <button onMouseDown={handleShowCommands}>Log Commands</button>
            </div>
        </div>
    )
}

const redBar = {
    width: '100%',
    backgroundColor: 'darkgrey',
    borderRadius: '3px',
    border: '1px solid grey',
}