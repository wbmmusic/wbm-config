import React, { useState } from 'react'
import NameInput from "../utilities/NameInput"
import MidiBtnButton from './MidiBtnButton'
import CommandsContainer from '../utilities/pickers/CommandsContainer'


export default function MidiBtnChannel(props) {
    const [name, setname] = useState('Name this button')

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
                            border: '1px black solid',
                            fontSize: '12px'
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
