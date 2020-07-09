import React, { useState } from 'react'
import NameInput from "../utilities/NameInput"
import MidiBtnButton from './MidiBtnButton'
import CommandsContainer from '../utilities/pickers/CommandsContainer'


export default function MidiBtnChannel(props) {
    const [name, setname] = useState('Button Name')

    const lblStyle = {
        userSelect: 'none',
    }

    function setName(newName) {
        setname(newName)
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td style={{ fontSize: '14px' }}>
                            <b style={lblStyle}>Button # {props.channel}</b>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <NameInput value={name} setValue={setName} />
                        </td>
                    </tr>
                    <tr>
                        <td style={{
                            backgroundColor: 'lightgrey',
                            border: '1px solid grey',
                            borderRadius: '10px',
                            padding: '8px',
                            fontSize: '12px',
                            boxShadow: 'inset 1px 1px 6px'
                        }}>
                            <MidiBtnButton />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <CommandsContainer direction="out" />
                        </td>
                    </tr>
                </tbody>
            </table>


        </div>
    )
}
