import React, { useContext } from 'react'
import NameInput from "../utilities/NameInput"
import MidiBtnButton from './MidiBtnButton'
import CommandsContainer from '../utilities/pickers/CommandsContainer'
import { MidiButtonChannelContext } from './Mid ButtonChannelContext'


export default function MidiBtnChannel(props) {
    const [channel, setChannel] = useContext(MidiButtonChannelContext)

    const lblStyle = {
        userSelect: 'none',
    }

    function setName(newName) {
        let tempChannel = { ...channel }
        tempChannel.name = newName
        setChannel(tempChannel)
    }

    const getStructure = (data) => {
        let tempChannel = { ...channel }
        tempChannel.commands = data
        setChannel(tempChannel)
    }

    return (
        <div style={{ width: '300px' }}>
            <table style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td style={{ fontSize: '14px' }}>
                            <b style={lblStyle}>Button #{props.channel}</b>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <NameInput value={channel.name} setValue={setName} />
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
                            <CommandsContainer
                                direction="out"
                                key="midiBtnCommandsContainer"
                                sendCommands={getStructure}
                                commands={channel.commands}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>


        </div>
    )
}
