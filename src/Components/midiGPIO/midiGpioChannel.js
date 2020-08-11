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
                if (!tempChannel.pickRing) {
                    tempChannel.pickRing = true
                    setChannel(tempChannel)
                }
                break;

            case 'tipBtn':
                if (tempChannel.pickRing) {
                    tempChannel.pickRing = false
                    setChannel(tempChannel)
                }
                break;

            case 'outBtn':
                if (tempChannel.in) {
                    tempChannel.in = false
                    setChannel(tempChannel)
                }
                break;

            case 'inBtn':
                if (!tempChannel.in) {
                    tempChannel.in = true
                    setChannel(tempChannel)
                }
                break;

            case 'tsBtn':
                if (tempChannel.trs || tempChannel.pickRing) {
                    tempChannel.trs = false
                    tempChannel.pickRing = false
                    setChannel(tempChannel)
                }
                break;

            case 'trsBtn':
                if (!tempChannel.trs || tempChannel.pickRing) {
                    tempChannel.trs = true
                    tempChannel.pickRing = false
                    setChannel(tempChannel)
                }
                break;

            default:
                alert('Error in handle press MIDI GPIO CHANNEL')
                return;
        }
    }

    const tipRingBtns = () => {
        if (!channel.trs) {
            return
        } else {
            return (
                <div className="insetui">
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

        if (channel.in && channel.pickRing) {
            //console.log('Ring In Commands')
            tempChannel.ringIn.commands = e
        } else if (!channel.in && channel.pickRing) {
            //console.log('Ring Out Commands')
            tempChannel.ringOut.commands = e
        } else if (channel.in && !channel.pickRing) {
            //console.log('Tip In Commands')
            tempChannel.tipIn.commands = e
        } else if (!channel.in && !channel.pickRing) {
            //console.log('Tip Out Commands')
            tempChannel.tipOut.commands = e
        } else {
            alert('Error In Channel Get Structure')
        }
        setChannel(tempChannel)
    }

    const makePicker = () => {
        //console.log(channel)
        if (channel.in && channel.pickRing) {
            //console.log('Show GPI RING')
            return (
                <CommandsContainer
                    key={"gpiRingContainer" + props.id}
                    direction="out"
                    sendCommands={getStructure}
                    commands={channel.ringIn.commands}
                />
            )
        } else if (!channel.in && channel.pickRing) {
            //console.log('Show GPO RING')
            return (
                <CommandsContainer
                    key={"gpoRingContainer" + props.id}
                    direction="in"
                    sendCommands={getStructure}
                    commands={channel.ringOut.commands}
                />
            )
        } else if (channel.in && !channel.pickRing) {
            //console.log('Show GPI TIP')
            return (
                <CommandsContainer
                    key={"gpiTipContainer" + props.id}
                    direction="out"
                    sendCommands={getStructure}
                    commands={channel.tipIn.commands}
                />
            )
        } else if (!channel.in && !channel.pickRing) {
            //console.log('Show GPO TIP')
            return (
                <CommandsContainer
                    key={"gpoTipContainer" + props.id}
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
            <div className="insetui">
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
        <div style={{ width: '300px' }} className="channelstyle">
            <table style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td style={{
                            textAlign: 'center',
                            fontSize: '14px'
                        }}>
                            <b>I/O #{props.channel}</b>
                            <div>
                                <NameInput value={channel.name} setValue={setName} />
                            </div>
                            {/* <button style={{ borderRadius: '4px' }} onMouseDown={printState}>STATE</button> */}
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