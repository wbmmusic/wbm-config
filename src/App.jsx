import React, { Component } from "react";
import "./App.css";
import "./Styles/channelstyle.css";
import Header from "./Components/layout/header";
import MidiLight from "./Components/midiLight/MidiLight";
import MidiGpio from "./Components/midiGPIO/midiGpio";
import MidiButton from "./Components/midiButton/MidiButton";
import MtcBox from "./Components/mtcDisplay/MtcBox";
import MidiAB from "./Components/midiAB/MidiAB";
import DevInfo from "./Components/utilities/DevInfo";
import Drag from "./Components/utilities/drag/Drag";
import TopMtx2 from "./matrix2/TopMtx2";

import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";

export class App extends Component {
  render() {
    return (
      <div style={{ userSelect: "none" }}>
        <Header />
        <Routes data-testId="router">
          <Route path="/midiLight" element={<MidiLight />} />
          <Route path="/midiGpio" element={<MidiGpio />} />
          <Route path="/midiButton" element={<MidiButton />} />
          <Route path="/mtcDisplay" element={<MtcBox />} />
          <Route path="/midiAB" element={<MidiAB />} />
          <Route path="/about" element={<TopMtx2 />} />
          <Route path="/drag" element={<Drag />} />
          <Route path="" element={<DevInfo />} />
        </Routes>
      </div>
    );
  }
}

export default App;
