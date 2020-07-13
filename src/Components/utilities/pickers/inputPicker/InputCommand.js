import React from 'react'
import NameInput from '../../NameInput'

export default function InputCommand(props) {

    function handelRemoveCommand() {
        props.remove(props.id)
    }

    function handleTextChange(text) {
        props.nameChange(props.id, text)
    }

    const cmdType = () => {
        if (props.commandData.type) {
            return (
                <pre>
                    Type: {props.commandData.type.label}
                </pre>
            )
        }
        return (
            <pre>
               Configure this Command
            </pre>
        )
    }

    return (
        <div style={{ border: '1px solid black', backgroundColor: 'lightgrey' }}>
            <div style={{ backgroundColor: 'grey', width: '100%' }}>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td><b>{props.idx + 1}</b></td>
                            <td>
                                <NameInput value={props.commandName} setValue={handleTextChange} />
                            </td>
                            <td style={{ width: '30px' }}>
                                <div
                                    onMouseDown={() => props.showPicker(props.id)}
                                    style={{
                                        fontSize: '12px',
                                        userSelect: 'none',
                                        backgroundColor: 'darkgrey',
                                        padding: '3px',
                                        borderRadius: '3px'
                                    }}
                                >
                                    <span role="img" aria-label='remove command'>⚙️</span>
                                </div>
                            </td>
                            <td style={{ width: '30px' }}>
                                <div
                                    onMouseDown={handelRemoveCommand}
                                    style={{
                                        fontSize: '12px',
                                        userSelect: 'none',
                                        backgroundColor: 'darkgrey',
                                        padding: '3px',
                                        borderRadius: '3px'
                                    }}
                                >
                                    <span role="img" aria-label='remove command'>❌</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                {cmdType()}
            </div>
        </div>
    )
}
