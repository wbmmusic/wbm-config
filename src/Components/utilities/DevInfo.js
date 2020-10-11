import React, { useState, useEffect } from 'react'

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faPlus, faInfo, faBars, faChevronCircleLeft, faLightbulb, faExchangeAlt, faHandPointUp, faTools } from '@fortawesome/free-solid-svg-icons'
import GpioSettings from './GpioSettings';
import MidiGpioChannel from '../midiGPIO/midiGpioChannel';
import { MidiGpioChannelProvider } from '../midiGPIO/MidiGpioChannelContext';

import TopMtx2 from '../../matrix2/TopMtx2'
import { Table } from 'react-bootstrap';

const tbl = <FontAwesomeIcon icon={faPlus} />
const matrix = <FontAwesomeIcon icon={faTh} />
const infoIcn = <FontAwesomeIcon icon={faTools} />
const chIcn = <FontAwesomeIcon icon={faBars} />
const backIcn = <FontAwesomeIcon icon={faChevronCircleLeft} />
const lightIcn = <FontAwesomeIcon icon={faLightbulb} />
const btnIcn = <FontAwesomeIcon icon={faHandPointUp} />
const gpioIcn = <FontAwesomeIcon icon={faExchangeAlt} />

const { ipcRenderer } = window.require('electron')

export default function DevInfo() {
    const defaultState = {
        list: [],
        devList: {},
        currentMenu: 'HOME',
        currentDevice: 'NONE',
        currentPage: 'SETTINGS',
        currentChannel: '',
        channels: []
    }

    const [state, setstate] = useState(defaultState)

    const [savedSanpshot, setsavedSanpshot] = useState(defaultState)

    var deviceEvent = (event, devList) => {
        makeDevTable(JSON.parse(devList))
    }

    useEffect(() => {
        ipcRenderer.on('devList', deviceEvent)
        ipcRenderer.send('showDevs')
        return () => {
            ipcRenderer.removeListener('devList', deviceEvent)
        }
    }, [])

    const makeDevTable = (devList) => {
        //console.log('IN MAKE DEV TBL')
        //console.log(devList)

        let deviceInfo = []
        let tempState = { ...state }
        tempState.devList = devList

        if (devList.length === 0) {
            deviceInfo = [
                <b>No Devices</b>
            ]
        } else {
            deviceInfo = []
            for (var i = 0; i < devList.length; i++) {
                deviceInfo.push(
                    <tr key={i}>
                        <td>{devList[i].info.Model}</td>
                        <td>{devList[i].info.UserName}</td>
                        <td>{devList[i].info.serialNumber}</td>
                    </tr>
                )
            }
        }

        tempState.list = deviceInfo
        setstate(tempState)
    }


    const setcurrentMenu = (menu) => {
        let tempstate = { ...state }
        tempstate.currentMenu = menu
        setstate(tempstate)
    }

    const setcurrentDevice = (device) => {
        let tempstate = { ...state }
        tempstate.currentDevice = device
        setstate(tempstate)
    }

    const doThis = (menu, page, serNum) => {
        let tempstate = { ...state }
        tempstate.currentMenu = menu
        tempstate.currentDevice = serNum
        tempstate.currentPage = page
        setstate(tempstate)
    }

    const selectChannel = (chnl) => {
        //console.log(chnl)
        let tempstate = { ...state }
        tempstate.currentMenu = 'GPIO'
        tempstate.currentDevice = state.currentDevice
        tempstate.currentPage = 'CHNL'
        tempstate.currentChannel = chnl
        setstate(tempstate)
    }

    let side = []

    const getChanelInfo = (chnl, e) => {
        //console.log('XXX GPIO CH STRUCTURE #' + chnl)
        state.channels[chnl - 1] = e
    }

    if (state.currentMenu === 'HOME') {
        let deviceList = []

        for (var i = 0; i < state.devList.length; i++) {
            let serNum = state.devList[i].info.serialNumber
            //console.log(state.devList[i].info.Model)
            if (state.devList.length > 0) {
                switch (state.devList[i].info.Model) {
                    case 'MIDI GPIO':
                        deviceList.push(
                            <MenuItem icon={gpioIcn} onClick={() => doThis('GPIO', 'SETTINGS', serNum)}>MIDI GPIO</MenuItem>
                        )
                        break;

                    default:
                        break;
                }
            }
        }


        side.push(
            <Menu iconShape="circle">
                {deviceList}
                <MenuItem icon={lightIcn}>MIDI Light</MenuItem>
                <MenuItem icon={btnIcn}>MIDI Button</MenuItem>
                <SubMenu title="Create Offline Device" icon={tbl}>
                    <SubMenu title="MIDI GPIO" icon={tbl}>
                        <MenuItem>GPIO 2.4</MenuItem>
                        <MenuItem>GPIO 4.8</MenuItem>
                        <MenuItem>GPIO 8.16</MenuItem>
                        <MenuItem>GPIO 16.32</MenuItem>
                    </SubMenu>
                    <SubMenu title="MIDI Light" icon={tbl}>
                        <MenuItem>Light 1</MenuItem>
                        <MenuItem>Light 4</MenuItem>
                    </SubMenu>
                    <SubMenu title="MIDI Button" icon={tbl}>
                        <MenuItem>Btn 4</MenuItem>
                        <MenuItem>Btn 8</MenuItem>
                    </SubMenu>
                </SubMenu>
            </Menu>
        )
    } else if (state.currentMenu === 'GPIO') {
        let channels = []

        for (var i = 0; i < 6; i++) {
            let channel = i + 1
            channels.push(
                <MenuItem
                    onClick={() => selectChannel(channel)}
                >
                    {i + 1}: User Name
          </MenuItem>
            )
        }

        side.push(
            <Menu iconShape="circle">
                <MenuItem icon={backIcn} onClick={() => doThis('HOME')}>Back</MenuItem>
                <MenuItem icon={infoIcn} onClick={() => doThis('GPIO', 'SETTINGS', state.currentDevice)}>Settings</MenuItem>
                <MenuItem icon={matrix} onClick={() => doThis('GPIO', 'ROUTE', state.currentDevice)}>Routing Matrix</MenuItem>
                <SubMenu title="Channels" icon={chIcn}>
                    {channels}
                </SubMenu>
            </Menu>
        )
    }

    const theList = () => {
        let out = []

        for (var i = 0; i < state.list.length; i++) {
            out.push(
                state.list[i]
            )
        }
        return (
            <Table striped>
                <thead>
                    <tr>
                        <th>Model</th>
                        <th>Name</th>
                        <th>Ser #</th>
                    </tr>
                </thead>
                <tbody>
                    {out}
                </tbody>
            </Table>
        )
    }

    let body = []

    if (state.currentMenu === 'HOME') {
        body.push(
            <>
                <div style={{ textAlign: 'center' }}>
                    <b>Devices</b>
                </div>
                {theList()}
            </>
        )
    } else if (state.currentMenu === 'GPIO') {
        switch (state.currentPage) {
            case 'SETTINGS':
                body.push(
                    <GpioSettings />
                )
                break;

            case 'ROUTE':
                body.push(
                    <>
                        Routing
                        <TopMtx2 />
                    </>
                )
                break;

            case 'CHNL':
                body.push(
                    <>
                        <MidiGpioChannelProvider key={'gpioChannelProvider' + i}>
                            <MidiGpioChannel
                                snapshot={savedSanpshot.channels[i]}
                                key={'gpioChannel' + i}
                                statex={state.channels[i]}
                                getChanelInfo={getChanelInfo}
                                channel={state.currentChannel}
                                id={state.currentChannel}
                            />
                        </MidiGpioChannelProvider>
                    </>
                )
                break;

            default:
                break;
        }
    }


    return (
        <table
            cellPadding='0'
            cellSpacing='0'
            style={{
                width: '100%',
                height: 'calc(100vh - 34px)',
            }}
        >
            <tbody>
                <tr>
                    <td style={{ width: '1%' }}>
                        <div style={sidebarDiv}>
                            <ProSidebar>
                                {side}
                            </ProSidebar>
                        </div>
                    </td>
                    <td>
                        <div style={bodyDiv}>
                            {body}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

    )
}

const sidebarDiv = {
    height: '100%',
    overflow: 'auto'
}

const bodyDiv = {
    //backgroundColor: 'pink',
    height: '100%',
}