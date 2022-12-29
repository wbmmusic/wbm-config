import React, { useState, useEffect } from "react";
import MidiLightChannel from "./MidiLightChannel";
import { MidiLightChannelProvider } from "./MidiLightChannelContext";

const { ipcRenderer } = window.require("electron");

export default function MidiLight() {
  let state = {
    numberOfChannels: 6,
    channels: [],
  };

  const [savedSanpshot, setsavedSanpshot] = useState(state);

  const openFromFile = (event, arg) => {
    console.log("GOT DATA FROM OPEN");
    let data = JSON.parse(arg);
    setsavedSanpshot(data);
  };

  useEffect(() => {
    ipcRenderer.on("asynchronous-reply", openFromFile);
    return () => {
      console.log("LIGHT CLEANUP");
      ipcRenderer.removeListener("asynchronous-reply", openFromFile);
    };
  }, []);

  const openBtnPress = () => {
    console.log("OPEN btn press");
    ipcRenderer.send("fileOpen", "wbmlight");
  };

  const saveBtnPress = () => {
    console.log("SAVE btn press");
    ipcRenderer.send("fileSave", "wbmlight", state);
  };

  const sendBtnPress = () => {
    console.log("SEND btn press");
    ipcRenderer.send("send", "wbmlight", JSON.stringify(state));
  };

  const saveAsBtnPress = () => {
    console.log("SAVE AS btn press");
    ipcRenderer.send("fileSaveAs", "wbmlight", JSON.stringify(state));
  };

  const seeState = () => {
    console.log(state);
    console.log(JSON.stringify(state));
  };

  const getChanelInfo = (chnl, e) => {
    state.channels[chnl - 1] = e;
  };

  const createTable = () => {
    let table = [];
    // Outer loop to create parent
    for (let i = 0; i < state.numberOfChannels; i++) {
      //Create the parent and add the children
      //console.log('XXX make chnl #' + (i + 1))
      table.push(
        <div
          key={"midiLightChannelDiv" + i}
          style={{
            display: "inline-block",
          }}
          channel={i + 1}
        >
          <MidiLightChannelProvider key={"midiLightChannelProvider" + i}>
            <MidiLightChannel
              snapshot={savedSanpshot.channels[i]}
              key={"midiLightChannel" + i}
              getChanelInfo={getChanelInfo}
              id={"midiLightChnl" + (i + 1)}
              channel={i + 1}
            />
          </MidiLightChannelProvider>
        </div>
      );
    }
    return table;
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "darkgrey",
          paddingBottom: "4px",
        }}
      >
        <b style={{ display: "block" }}>MIDI Light</b>
        <table style={{ display: "inline-block", paddingLeft: "6px" }}>
          <tbody>
            <tr>
              <td>
                <div className="opensavebtns" onMouseDown={openBtnPress}>
                  Open
                </div>
              </td>
              <td>
                <div className="opensavebtns" onMouseDown={saveBtnPress}>
                  Save
                </div>
              </td>
              <td>
                <div className="opensavebtns" onMouseDown={saveAsBtnPress}>
                  Save As
                </div>
              </td>
              <td>
                <div className="opensavebtns" onMouseDown={seeState}>
                  STATE
                </div>
              </td>
              <td>
                <div className="opensavebtns" onMouseDown={sendBtnPress}>
                  Send
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {createTable()}
    </div>
  );
}
