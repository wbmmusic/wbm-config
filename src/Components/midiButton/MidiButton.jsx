import React, { useState, useEffect } from "react";
import MidiBtnChannel from "./MidiBtnChannel";
import { MidiButtonChannelProvider } from "./Mid ButtonChannelContext";

const { ipcRenderer } = window.require("electron");

export default function MidiButton() {
  let state = {
    numberOfChannels: 6,
    channels: [],
  };

  const [savedSnapshot, setSavedSnapshot] = useState(state);

  const openFromFile = (event, arg) => {
    //console.log('GOT DATA FROM OPEN')
    let data = JSON.parse(arg);
    setSavedSnapshot(data);
  };

  useEffect(() => {
    ipcRenderer.on("asynchronous-reply", openFromFile);
    return () => {
      console.log("BUTTON CLEANUP");
      ipcRenderer.removeListener("asynchronous-reply", openFromFile);
    };
  }, []);

  const openBtnPress = () => {
    console.log("OPEN btn press");
    ipcRenderer.send("fileOpen", "wbmbtn");
  };

  const saveBtnPress = () => {
    console.log("SAVE btn press");
    ipcRenderer.send("fileSave", "wbmbtn", state);
  };

  const saveAsBtnPress = () => {
    console.log("SAVE AS btn press");
    ipcRenderer.send("fileSaveAs", "wbmbtn", JSON.stringify(state));
  };

  const seeState = () => {
    console.log(state);
    console.log(JSON.stringify(state));
  };

  const getChanelInfo = (chnl, e) => {
    state.channels[chnl - 1] = e;
  };

  const createChannels = () => {
    let table = [];
    // Outer loop to create parent
    for (let i = 0; i < 6; i++) {
      //Create the parent and add the children
      table.push(
        <div
          key={"MidiButtonChannelDiv" + i}
          style={{ display: "inline-block" }}
        >
          <MidiButtonChannelProvider key={"MidiButtonChannelProvider" + i}>
            <MidiBtnChannel
              snapshot={savedSnapshot.channels[i]}
              key={"midiButtonChannel" + i}
              getChanelInfo={getChanelInfo}
              id={"midiButtonChnl" + (i + 1)}
              channel={i + 1}
            />
          </MidiButtonChannelProvider>
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
        <b style={{ display: "block" }}>MIDI Button</b>
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
            </tr>
          </tbody>
        </table>
      </div>
      {createChannels()}
    </div>
  );
}
