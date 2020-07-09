import React, { Fragment, useState } from 'react'
import InputCommand from './inputPicker/InputCommand'
import { v4 as uuid } from 'uuid';
import NameInput from '../NameInput';
import InputCommandPickerv2 from './inputPicker/InputCommandPickerv2';
import OutputCommandPickerv2 from './outputPicker/OutputCommandPickerv2';

export default function CommandsContainer(props) {

    const [commands, setCommands] = useState([])
    const [showPicker, setshowPicker] = useState({
        id: '',
        true: false
    })

    const handleShowCommands = () => {
        console.log(commands)
    }

    const handleNameChange = (id, newName) => {
        for (var i = 0; i < commands.length; i++) {
            if (commands[i].id === id) {
                let tempCommands = commands
                tempCommands[i].commandName = newName
                setCommands(tempCommands)
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
        setCommands(commands.filter(item => item.id !== id))
    }

    const handleAdd = () => {
        setCommands([...commands, {
            id: uuid(),
            commandName: Math.floor(Math.random(0) * 100000) + 1,
            pickerData: {}
        }])
    }

    const handleShowPicker = (id) => {
        console.log('In Handle Show Picker ' + id)
        setshowPicker({
            id: id,
            true: true
        })
    }

    const handleReturnToList = () => {
        console.log('In Handle Return To List')
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
                                            userSelect: 'none',
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

    const showCommandPicker = () => {
        let thePicker = []
        let tempCommand = commands.filter(cmd => cmd.id === showPicker.id)

        const handleNameChange2 = (newName) => {
            console.log('Name Change ' + newName)
            console.log(tempCommand[0].id)

            for (var i = 0; i < commands.length; i++) {
                if (commands[i].id === tempCommand[0].id) {
                    console.log('GOT A MATCH')
                    let tempCommands = commands
                    tempCommands[i].commandName = newName
                    setCommands(tempCommands)
                    break
                }
            }
        }

        if (props.direction === 'in') {
            thePicker = (<InputCommandPickerv2 />)
        } else if (props.direction === 'out') {
            thePicker = (<OutputCommandPickerv2 />)
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
                                    <NameInput value={tempCommand[0].commandName} setValue={handleNameChange2} />
                                </td>
                                <td style={{ width: '30px' }}>
                                    <div
                                        style={{
                                            backgroundColor: 'lightgrey',
                                            padding: '3px',
                                            border: '1px solid black',
                                            borderRadius: '3px',
                                            userSelect: 'none',
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

    let body

    if (!showPicker.true) {
        body = showList()
    } else {
        body = showCommandPicker()
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
                {body}
                <button onMouseDown={handleShowCommands}>Log Commands</button>
            </div>
        </div>
    )
}

const redBar = {
    width: '100%',
    backgroundColor: 'darkgrey',
    borderRadius: '3px',
    userSelect: 'none',
    border: '1px solid grey',
}