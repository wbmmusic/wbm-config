import React, { useEffect, useContext } from 'react'
import MidiLightLED from './MidiLightLED'
import NameInput from '../utilities/NameInput';
import CommandsContainer from '../utilities/pickers/CommandsContainer'
import { MidiLightChannelContext } from './MidiLightChannelContext';

const { ipcRenderer } = window.require('electron')

export default function MidiLightChannel(props) {
    const [channel, setChannel] = useContext(MidiLightChannelContext)

    useEffect(() => {
        //console.log('Props Snapshot triggered update')
        if (props.snapshot !== undefined) {
            let tempChannel = { ...props.snapshot }
            setChannel(tempChannel)
        }
    }, [props.snapshot])

    useEffect(() => {
        //console.log('Channel ' + props.channel + ' send state')
        //console.log(channel)
        props.getChanelInfo(props.channel, channel)
    }, [channel])

    const makePicker = () => {
        //console.log('Make Picker ' + props.channel)
        return (
            <CommandsContainer
                key={"midiLightPickerCh" + props.channel}
                sendCommands={getPickerStructure}
                commands={channel.commands}
                direction="in"
            />
        )
    }

    const setName = (newName) => {
        let tempState = { ...channel }
        tempState.name = newName
        setChannel(tempState)

        //Send info to color picker window
        ipcRenderer.send('nameChange', props.channel, newName)
    }

    const printState = () => {
        console.log('Print CH #' + props.channel + ' STATE')
        console.log(channel)
    }

    const getPickerStructure = (commands) => {
        let tempChannel = { ...channel }
        tempChannel.commands = commands
        setChannel(tempChannel)
    }

    const chName = () => {
        let tempChannel = { ...channel }
        return (
            < NameInput value={tempChannel.name} setValue={setName} />
        )
    }

    return (
        <div className="channelstyle">
            <table>
                <tbody>
                    <tr>
                        <td style={tableCellStyle}>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ fontSize: '14px', userSelect: 'none' }}>
                                            <b>LED #{props.channel}</b>
                                            <br />
                                            {/* <button style={{ borderRadius: '4px' }} onMouseDown={printState}>STATE</button> */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={tableCellStyle}>
                                            {chName()}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style={tableCellStyle}>
                            <MidiLightLED
                                key={"ledUICh" + props.channel}
                                channel={props.channel}
                                context={MidiLightChannelContext}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={tableCellStyle}>
                            {makePicker()}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


const tableCellStyle = {
    textAlign: 'center',
    width: '300px'
}