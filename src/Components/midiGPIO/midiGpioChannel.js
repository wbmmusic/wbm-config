import React, { useEffect, useContext } from 'react'
import NameInput from '../utilities/NameInput';
import CommandsContainer from '../utilities/pickers/CommandsContainer'
import { MidiGpioChannelContext } from './MidiGpioChannelContext';

export default function MidiGpioChannel(props) {
    const [channel, setChannel] = useContext(MidiGpioChannelContext)

    useEffect(() => {
        //console.log(props.snapshot)
        if (props.snapshot !== undefined) {
            setChannel(props.snapshot)
        }
    }, [props.snapshot])

    useEffect(() => {
        props.getChanelInfo(props.channel, channel)
        //console.log('Midi GPIO channel state change ' + props.channel)
        //console.log('Ch ' + props.channel + ' Send State Up')
    }, [channel])

    const printState = () => {
        console.log(channel)
    }

    const setName = (name) => {
        let tempChannel = { ...channel }
        tempChannel.name = name
        setChannel(tempChannel)
    }

    const handlePress = (e) => {
        let tempChannel = { ...channel }
        switch (e.target.id) {
            case 'ringBtn':
                tempChannel.pickRing = true
                break;

            case 'tipBtn':
                tempChannel.pickRing = false
                break;

            case 'outBtn':
                tempChannel.in = false
                break;

            case 'inBtn':
                tempChannel.in = true
                break;

            case 'tsBtn':
                tempChannel.trs = false
                tempChannel.pickRing = false
                break;

            case 'trsBtn':
                tempChannel.trs = true
                tempChannel.pickRing = false
                break;

            default:
                alert('Error in handle press MIDI GPIO CHANNEL')
                break;
        }
        setChannel(tempChannel)
    }

    const tipRingBtns = () => {
        if (!channel.trs) {
            return
        } else {
            return (
                <div
                    style={{
                        backgroundColor: 'lightgrey',
                        borderRadius: '10px',
                        padding: '8px',
                        border: '1px solid grey',
                        boxShadow: 'inset 1px 1px 6px',
                        fontSize: '12px'
                    }}
                >
                    View
                    <hr />
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <div
                                        style={{
                                            padding: '2px',
                                            border: '1px solid grey',
                                            borderRadius: '4px',
                                            cursor: 'context-menu',
                                            backgroundColor: channel.pickRing ? 'white' : 'lightgreen',
                                            fontSize: '12px'
                                        }}
                                        id="tipBtn"
                                        onMouseDown={handlePress}>
                                        TIP

                                                </div>

                                </td>
                                <td style={{ width: '50%' }}>
                                    <div
                                        style={{
                                            padding: '2px',
                                            border: '1px solid grey',
                                            borderRadius: '4px',
                                            cursor: 'context-menu',
                                            backgroundColor: channel.pickRing ? 'lightgreen' : 'white',
                                            fontSize: '12px',
                                        }}
                                        id="ringBtn"
                                        onMouseDown={handlePress}>
                                        RING

                                            </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    const getStructure = (e) => {
        //console.log('XXX GOT STRUCTURE #')

        let tempChannel = { ...channel }

        if (channel.in && channel.trs) {
            //console.log('Ring In Commands')
            tempChannel.ringIn.commands = e
        } else if (!channel.in && channel.trs) {
            //console.log('Ring Out Commands')
            tempChannel.ringOut.commands = e
        } else if (channel.in && !channel.trs) {
            //console.log('Tip In Commands')
            tempChannel.tipIn.commands = e
        } else if (!channel.in && !channel.trs) {
            //console.log('Tip Out Commands')
            tempChannel.tipOut.commands = e
        }

        setChannel(tempChannel)

    }

    const makePicker = () => {
        //console.log(channel)
        if (channel.in && channel.pickRing) {
            //console.log('Show GPI RING')
            return (
                <CommandsContainer
                    key="gpiRingContainer"
                    direction="out"
                    sendCommands={getStructure}
                    commands={channel.ringIn.commands}
                />
            )
        } else if (!channel.in && channel.pickRing) {
            //console.log('Show GPO RING')
            return (
                <CommandsContainer
                    key="gpoRingContainer"
                    direction="in"
                    sendCommands={getStructure}
                    commands={channel.ringOut.commands}
                />
            )
        } else if (channel.in && !channel.pickRing) {
            //console.log('Show GPI TIP')
            return (
                <CommandsContainer
                    key="gpiTipContainer"
                    direction="out"
                    sendCommands={getStructure}
                    commands={channel.tipIn.commands}
                />
            )
        } else if (!channel.in && !channel.pickRing) {
            //console.log('Show GPO TIP')
            return (
                <CommandsContainer
                    key="gpoTipContainer"
                    direction="in"
                    sendCommands={getStructure}
                    commands={channel.tipOut.commands}
                />
            )
        } else {
            console.log('---ERROR Choosing CommandContainer Settings')
        }

    }

    const portSettings = () => {
        return (
            <div
                style={{
                    backgroundColor: 'lightgrey',
                    padding: '8px',
                    borderRadius: '10px',
                    border: '1px solid grey',
                    boxShadow: 'inset 1px 1px 6px',
                    fontSize: '12px'
                }}
            >
                Port Settings
                <hr />
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td style={btnTd}>
                                <div
                                    id="inBtn"
                                    onMouseDown={handlePress}
                                    style={{
                                        cursor: 'context-menu',
                                        padding: '2px',
                                        border: '1px solid grey',
                                        borderRadius: '4px',
                                        width: "100%",
                                        backgroundColor: channel.in ? 'lightgreen' : 'white',
                                        fontSize: '12px',
                                    }}>
                                    IN
                                                </div>
                            </td>
                            <td style={btnTd}>
                                <div
                                    id="outBtn"
                                    onMouseDown={handlePress}
                                    style={{
                                        cursor: 'context-menu',
                                        padding: '2px',
                                        border: '1px solid grey',
                                        borderRadius: '4px',
                                        width: "100%",
                                        backgroundColor: channel.in ? 'white' : 'lightgreen',
                                        fontSize: '12px'
                                    }}>
                                    OUT
                                                </div>
                            </td>
                            <td style={{ width: '4%' }}></td>
                            <td style={btnTd}>
                                <div
                                    id="tsBtn"
                                    onMouseDown={handlePress}
                                    style={
                                        {
                                            cursor: 'context-menu',
                                            padding: '2px',
                                            border: '1px solid grey',
                                            borderRadius: '4px',
                                            width: "100%",
                                            backgroundColor: channel.trs ? 'white' : 'lightgreen',
                                            fontSize: '12px'
                                        }}>
                                    TS
                                                </div>
                            </td>
                            <td style={btnTd}>
                                <div
                                    id="trsBtn"
                                    onMouseDown={handlePress}
                                    style={{
                                        cursor: 'context-menu',
                                        padding: '2px',
                                        border: '1px solid grey',
                                        borderRadius: '4px',
                                        width: "100%",
                                        backgroundColor: channel.trs ? 'lightgreen' : 'white',
                                        fontSize: '12px'
                                    }}>
                                    TRS
                                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div style={{ width: '300px' }}>
            <table style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td style={{
                            textAlign: 'center',
                            fontSize: '14px'
                        }}>
                            <b style={{ userSelect: 'none' }}>I/O #{props.channel}</b>
                            <div>
                                <NameInput value={channel.name} setValue={setName} />
                            </div>
                            <button style={{ borderRadius: '4px' }} onMouseDown={printState}>STATE</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {portSettings()}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {tipRingBtns()}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {makePicker()}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}

const btnTd = {
    padding: '1.5px 3px',
    width: '24%',
}