import React, { Fragment, useState, useEffect } from "react";
import Select from "react-select";
import InputSelect from "../IOSelect";
import {
  inputTypesDropDown,
  one127,
  noteDropDown,
  ccDropDown,
  numberOfInputs,
} from "./inMidiTables";
import ChannelSelect from "../ChannelSelect";
import SelectionType from "../SelectionType";
import SysExInput from "../SysExInput";
import MTCinput from "../MTCinput";
import { Slider } from "@mui/material";

let defaultState = {
  id: "picker" + 1,
  parentCh: 1,
  type: {
    label: "None",
    value: 0,
  },
  selectedIns: 0x01,
  selectedCh: 256,
  channel: 11,
  noteType: "Specific",
  note: null,
  ccType: "Specific",
  cc: null,
  pgmType: "Specific",
  program: null,
  velType: "Any",
  velocity: null,
  valType: "Any",
  value: null,
  pbValType: "Specific",
  pbVal: 0,
  pbRange: [-2000, 2000],
  songType: "Specific",
  song: null,
  mtc: {
    rate: "29.97fps",
    hour: "00",
    min: "00",
    sec: "00",
    frame: "00",
  },
  sysexText: "Enter Sysex Data",
  sysex: "Enter HEX data here",
};

export default function InputCommandPicker(props) {
  /////
  if (props.data.pickerData.type) {
    //Merge shrunk picker data with defaultState
    defaultState = Object.assign(defaultState, props.data.pickerData);
    //defaultState = props.data.pickerData
  }

  const [state, setstate] = useState(defaultState);

  useEffect(() => {
    const shrinkPicker = () => {
      let shrunkState = {};

      shrunkState.id = state.id;
      shrunkState.parentCh = state.parentCh;
      shrunkState.type = state.type;

      switch (state.type.label) {
        case "None":
          break;

        case "Note Off" || "Note On":
          shrunkState.selectedIns = state.selectedIns;
          shrunkState.selectedCh = state.selectedCh;
          shrunkState.channel = state.channel;
          shrunkState.noteType = state.noteType;
          shrunkState.note = state.note;
          shrunkState.velType = state.velType;
          shrunkState.velocity = state.velocity;
          break;

        case "Note On":
          shrunkState.selectedIns = state.selectedIns;
          shrunkState.selectedCh = state.selectedCh;
          shrunkState.channel = state.channel;
          shrunkState.noteType = state.noteType;
          shrunkState.note = state.note;
          shrunkState.velType = state.velType;
          shrunkState.velocity = state.velocity;
          break;

        case "Control Change":
          shrunkState.selectedIns = state.selectedIns;
          shrunkState.selectedCh = state.selectedCh;
          shrunkState.channel = state.channel;
          shrunkState.ccType = state.ccType;
          shrunkState.cc = state.cc;
          shrunkState.valType = state.valType;
          shrunkState.value = state.value;

          break;

        case "Program Change":
          shrunkState.selectedIns = state.selectedIns;
          shrunkState.selectedCh = state.selectedCh;
          shrunkState.channel = state.channel;
          shrunkState.pgmType = state.pgmType;
          shrunkState.program = state.program;
          break;

        case "Pitch Bend":
          shrunkState.selectedIns = state.selectedIns;
          shrunkState.selectedCh = state.selectedCh;
          shrunkState.channel = state.channel;
          shrunkState.pbValType = state.pbValType;
          shrunkState.pbVal = state.pbVal;
          shrunkState.pbRange = state.pbRange;
          break;

        case "Sys Ex":
          shrunkState.selectedIns = state.selectedIns;
          shrunkState.sysexText = state.sysexText;
          shrunkState.sysex = state.sysex;
          break;

        case "MTC":
          shrunkState.selectedIns = state.selectedIns;
          shrunkState.mtc = state.mtc;
          break;

        case "Song Select":
          shrunkState.selectedIns = state.selectedIns;
          shrunkState.songType = state.songType;
          shrunkState.song = state.song;
          break;

        case "Start" || "Stop" || "Continue" || "System Reset":
          shrunkState.selectedIns = state.selectedIns;
          break;

        default:
          return state;
      }
      return shrunkState;
    };

    //console.log('State Changed')
    props.sendData(props.id, shrinkPicker());
  }, [state]);

  const getChannels = channels => {
    setstate(old => ({ ...old, selectedCh: channels }));
  };

  const typeSelection = (type, data) => {
    //console.log(data)
    if (type === "Velocity") {
      setstate(old => ({ ...old, velType: data }));
    } else if (type === "Note") {
      setstate(old => ({ ...old, noteType: data }));
    } else if (type === "ControlChange") {
      setstate(old => ({ ...old, ccType: data }));
    } else if (type === "Value") {
      setstate(old => ({ ...old, valType: data }));
    } else if (type === "Program") {
      setstate(old => ({ ...old, pgmType: data }));
    } else if (type === "Song") {
      setstate(old => ({ ...old, songType: data }));
    } else if (type === "PitchBend") {
      setstate(old => ({ ...old, pbValType: data }));
    }
  };

  const channelSelect = () => {
    return (
      <tr key={"channelSelect" + props.channel}>
        <td>
          <b style={label}>CH:</b>
        </td>
        <td>
          <ChannelSelect sendData={getChannels} data={state.selectedCh} />
        </td>
      </tr>
    );
  };

  const handleMtc = (rate, hour, min, sec, frm) => {
    //console.log(hour + ':' + min + ':' + sec + ':' + frm + ' ' + rate)

    let tempState = { ...state };
    tempState.mtc.rate = rate;
    tempState.mtc.hour = hour;
    tempState.mtc.min = min;
    tempState.mtc.sec = sec;
    tempState.mtc.frame = frm;
    if (tempState.mtc !== state.mtc) {
      setstate(tempState);
    }
  };

  const handleInSelData = theData => {
    setstate(old => ({ ...old, selectedIns: theData }));
  };

  const handleNoteChange = theData => {
    setstate(old => ({ ...old, note: theData }));
  };

  const handlePgmChange = theData => {
    setstate(old => ({ ...old, program: theData }));
  };

  const handleCcChange = theData => {
    setstate(old => ({ ...old, cc: theData }));
  };

  const handleValueChange = theData => {
    setstate(old => ({ ...old, value: theData }));
  };

  const handleVelocityChange = theData => {
    setstate(old => ({ ...old, velocity: theData }));
  };

  const handleSongChange = theData => {
    setstate(old => ({ ...old, song: theData }));
  };

  const handleSpecificPbChange = e => {
    setstate(old => ({ ...old, pbVal: parseInt(e.target.value) }));
  };

  const handleSpecificPbSliderChange = e => {
    setstate(old => ({ ...old, pbVal: e.target.value }));
  };

  const handlePbRangeSliderChange = e => {
    setstate(old => ({ ...old, pbRange: e.target.value }));
  };

  const handleRangeLowPbChange = e => {
    setstate(old => ({ ...old, pbRange: e.target.value }));
  };

  const handleRangeHighPbChange = e => {
    setstate(old => ({ ...old, pbRange: [old.pbRange[0], e.target.value] }));
  };

  const inputSelect = () => {
    return (
      <tr key={"inputSelcet" + props.id}>
        <td>
          <b style={label}>Input:</b>
        </td>
        <td>
          <InputSelect
            data={{
              ins: numberOfInputs,
              selection: state.selectedIns,
            }}
            sendData={handleInSelData}
          />
        </td>
      </tr>
    );
  };

  const noteSelect = () => {
    let xyz = [];
    if (state.noteType === "Specific") {
      xyz.push(
        <Select
          key={"noteSelection" + props.channel}
          name="noteSelector"
          styles={selectStyle}
          hideResetButton="true"
          style={{ textAlign: "left" }}
          options={noteDropDown()}
          value={state.note}
          theme="default"
          onChange={e => {
            handleNoteChange(e);
          }}
        />
      );
    } else if (state.noteType === "Multiple") {
      xyz.push(
        <Select
          key={"noteSelection" + props.channel}
          name="noteSelector"
          isMulti
          styles={selectStyle}
          hideResetButton="true"
          style={{ textAlign: "left" }}
          options={noteDropDown()}
          value={state.note}
          theme="default"
          onChange={e => {
            handleNoteChange(e);
          }}
        />
      );
    } else if (state.noteType === "Range") {
      xyz.push(
        <div key="noteRange" style={rangeDiv}>
          <Slider min={0} max={127} />
        </div>
      );
    } else if (state.noteType === "Any") {
      //NOTHING
    } else {
      xyz.push(<b>ERROR</b>);
    }

    return (
      <tr key={"noteSelectOutput" + props.channel}>
        <td>
          <b style={label}>Note:</b>
        </td>
        <td>
          <SelectionType
            type="Note"
            data={state.noteType}
            sendData={typeSelection}
          />
          {xyz}
        </td>
      </tr>
    );
  };

  const ccSelect = () => {
    let body = [];

    if (state.ccType === "Specific") {
      body.push(
        <Select
          key={"ccSpecificTypeSelect" + props.channel}
          name="noteSelector"
          styles={selectStyle}
          hideResetButton="true"
          style={{ textAlign: "left" }}
          options={ccDropDown()}
          value={state.cc}
          theme="default"
          onChange={e => {
            handleCcChange(e);
          }}
        />
      );
    } else if (state.ccType === "Multiple") {
      body.push(
        <Select
          key={"ccSpecificTypeSelect" + props.channel}
          name="noteSelector"
          isMulti
          styles={selectStyle}
          hideResetButton="true"
          style={{ textAlign: "left" }}
          options={ccDropDown()}
          value={state.cc}
          theme="default"
          onChange={e => {
            handleCcChange(e);
          }}
        />
      );
    } else if (state.ccType === "Range") {
      body.push(
        <div key="pbRange" style={rangeDiv}>
          <Slider min={0} max={127} />
        </div>
      );
    }

    return (
      <tr key={"ccSelector" + props.channel}>
        <td>
          <b style={label}>CC#:</b>
        </td>
        <td>
          <SelectionType
            type="ControlChange"
            data={state.ccType}
            sendData={typeSelection}
          />
          {body}
        </td>
      </tr>
    );
  };

  const pgmSelect = () => {
    let pgm = [];

    if (state.pgmType === "Specific") {
      pgm.push(
        <Select
          key={"pgmSelector" + props.channel}
          name="typeSelector"
          styles={selectStyle}
          hideResetButton="true"
          style={{ textAlign: "left" }}
          options={one127()}
          value={state.program}
          theme="default"
          onChange={e => {
            handlePgmChange(e);
          }}
        />
      );
    } else if (state.pgmType === "Multiple") {
      pgm.push(
        <Select
          key={"pgmSelector" + props.channel}
          name="typeSelector"
          isMulti
          styles={selectStyle}
          hideResetButton="true"
          style={{ textAlign: "left" }}
          options={one127()}
          value={state.program}
          theme="default"
          onChange={e => {
            handlePgmChange(e);
          }}
        />
      );
    } else if (state.pgmType === "Range") {
      pgm.push(
        <div key="pbRange" style={rangeDiv}>
          <Slider min={0} max={127} />
        </div>
      );
    }

    return (
      <tr key={"pgmSelectorOut" + props.channel}>
        <td>
          <b style={label}>PGM#:</b>
        </td>
        <td>
          <SelectionType
            type="Program"
            data={state.pgmType}
            sendData={typeSelection}
          />
          {pgm}
        </td>
      </tr>
    );
  };

  const mtcSelect = () => {
    return (
      <tr key={"mtcSelector" + props.channel}>
        <td>
          <b style={label}>Time:</b>
        </td>
        <td>
          <MTCinput sendMtc={handleMtc} data={state.mtc} />
        </td>
      </tr>
    );
  };

  const sysexData = () => {
    return (
      <tr key={"sysexDataInput" + props.id}>
        <td>
          <b style={label}>DATA:</b>
        </td>
        <td>
          <SysExInput text={state.sysexText} />
        </td>
      </tr>
    );
  };

  const songSelect = () => {
    let song = [];

    if (state.songType === "Specific") {
      song.push(
        <Select
          key={"songSelector" + props.channel}
          name="songSelector"
          styles={selectStyle}
          hideResetButton="true"
          style={{ textAlign: "left" }}
          options={one127()}
          value={state.song}
          theme="default"
          onChange={e => {
            handleSongChange(e);
          }}
        />
      );
    } else if (state.songType === "Multiple") {
      song.push(
        <Select
          key={"songSelector" + props.channel}
          name="songSelector"
          isMulti
          styles={selectStyle}
          hideResetButton="true"
          style={{ textAlign: "left" }}
          options={one127()}
          value={state.song}
          theme="default"
          onChange={e => {
            handleSongChange(e);
          }}
        />
      );
    } else if (state.songType === "Range") {
      song.push(
        <div key="songRange" style={rangeDiv}>
          <Slider />
        </div>
      );
    }
    return (
      <tr key={"songSelectorOut" + props.channel}>
        <td>
          <b style={label}>Song:</b>
        </td>
        <td>
          <SelectionType
            type="Song"
            data={state.songType}
            sendData={typeSelection}
          />
          {song}
        </td>
      </tr>
    );
  };

  const velSelect = () => {
    let velocity = [];

    if (state.velType === "Specific") {
      velocity.push(
        <Select
          key={"velocitySelest" + props.channel}
          name="velocitySelector"
          styles={selectStyle}
          hideResetButton="true"
          style={{ textAlign: "left" }}
          options={one127()}
          value={state.velocity}
          theme="default"
          onChange={e => {
            handleVelocityChange(e);
          }}
        />
      );
    } else if (state.velType === "Multiple") {
      velocity.push(
        <Select
          key={"velocitySelest" + props.channel}
          name="velocitySelector"
          isMulti
          styles={selectStyle}
          hideResetButton="true"
          style={{ textAlign: "left" }}
          options={one127()}
          value={state.velocity}
          theme="default"
          onChange={e => {
            handleVelocityChange(e);
          }}
        />
      );
    } else if (state.velType === "Range") {
      velocity.push(
        <div key="pbRange" style={rangeDiv}>
          <Slider min={0} max={127} />
        </div>
      );
    }

    return (
      <tr key={"velocityInput" + props.channel}>
        <td>
          <b style={label}>Vel:</b>
        </td>
        <td>
          <SelectionType
            type="Velocity"
            data={state.velType}
            sendData={typeSelection}
          />
          {velocity}
        </td>
      </tr>
    );
  };

  const pitchBendSelect = () => {
    let abc = [];
    if (state.pbValType === "Specific") {
      abc.push(
        <Fragment key={"pbInputCh" + props.channel}>
          <Slider
            onChange={handleSpecificPbSliderChange}
            min={-8192}
            max={8191}
            value={state.pbVal}
          />
          <input
            key={"pitchBendInput" + props.id}
            name="PitchBendBox"
            type="number"
            min="-8192"
            max="8191"
            value={state.pbVal}
            onChange={handleSpecificPbChange}
            style={{
              textAlign: "center",
            }}
          />
        </Fragment>
      );
    } else if (state.pbValType === "Multiple") {
      abc.push(<b>Multi Select</b>);
    } else if (state.pbValType === "Range") {
      abc.push(
        <Fragment key={"pbRangeInputCh" + props.channel}>
          <div style={rangeDiv}>
            <Slider
              min={-8192}
              max={8191}
              value={state.pbRange}
              onChange={handlePbRangeSliderChange}
            />
          </div>
          <input
            name={"PitchBendRangeLowBoxCh" + props.channel}
            type="number"
            min="-8192"
            max="8191"
            value={state.pbRange[0]}
            onChange={handleRangeLowPbChange}
            style={{
              textAlign: "center",
            }}
          />
          {" - "}
          <input
            name={"PitchBendRangeHighBoxCh" + props.channel}
            type="number"
            min="-8192"
            max="8191"
            value={state.pbRange[1]}
            onChange={handleRangeHighPbChange}
            style={{
              textAlign: "center",
            }}
          />
        </Fragment>
      );
    } else if (state.pbValType === "Any") {
      //NOTHING
    } else {
      abc.push(<b>ERROR</b>);
    }

    return (
      <tr key={"pitchBendInput" + props.channel}>
        <td>
          <b style={label}>Val:</b>
        </td>
        <td>
          <SelectionType
            type="PitchBend"
            data={state.pbValType}
            sendData={typeSelection}
          />
          {abc}
        </td>
      </tr>
    );
  };

  const valSelect = () => {
    let value = [];

    if (state.valType === "Specific") {
      value.push(
        <Select
          key={"valueSelest" + props.channel}
          name="valueSelector"
          styles={selectStyle}
          hideResetButton="true"
          style={{ textAlign: "left" }}
          options={one127()}
          value={state.value}
          theme="default"
          onChange={e => {
            handleValueChange(e);
          }}
        />
      );
    } else if (state.valType === "Multiple") {
      value.push(
        <Select
          key={"valueSelest" + props.channel}
          name="valueSelector"
          isMulti
          styles={selectStyle}
          hideResetButton="true"
          style={{ textAlign: "left" }}
          options={one127()}
          value={state.value}
          theme="default"
          onChange={e => {
            handleValueChange(e);
          }}
        />
      );
    } else if (state.valType === "Range") {
      value.push(
        <div key="pbRange" style={rangeDiv}>
          <Slider min={0} max={127} />
        </div>
      );
    }

    return (
      <tr key={"valueSelector" + props.channel}>
        <td>
          <b style={label}>Val:</b>
        </td>
        <td>
          <SelectionType
            type="Value"
            data={state.valType}
            sendData={typeSelection}
          />
          {value}
        </td>
      </tr>
    );
  };

  const handleTypeChange = theData => {
    let tempState = { ...state };
    tempState.type = theData;
    setstate(tempState);
  };

  const printState = () => {
    console.log(state);
  };

  ///////////////////////////////////////////////////////////////////// RENDER

  let underType = "Under Type";
  underType = [];
  let spacer = [];

  const horizontalSpacer = (
    <tr>
      <td colSpan="2">
        <hr />
      </td>
    </tr>
  );

  if (state.type.label !== "None") {
    spacer.push(horizontalSpacer);
    underType.push(inputSelect());
  }
  switch (state.type.label) {
    case "None":
      break;

    case "Note On":
      underType.push(
        horizontalSpacer,
        channelSelect(),
        horizontalSpacer,
        noteSelect(),
        horizontalSpacer,
        velSelect()
      );
      break;

    case "Note Off":
      underType.push(
        horizontalSpacer,
        channelSelect(),
        horizontalSpacer,
        noteSelect(),
        horizontalSpacer,
        velSelect()
      );
      break;

    case "Control Change":
      underType.push(
        horizontalSpacer,
        channelSelect(),
        horizontalSpacer,
        ccSelect(),
        horizontalSpacer,
        valSelect()
      );
      break;

    case "Program Change":
      underType.push(
        horizontalSpacer,
        channelSelect(),
        horizontalSpacer,
        pgmSelect()
      );
      break;

    case "Pitch Bend":
      underType.push(
        horizontalSpacer,
        channelSelect(),
        horizontalSpacer,
        pitchBendSelect()
      );
      break;

    case "Sys Ex":
      underType.push(horizontalSpacer, sysexData());
      break;

    case "MTC":
      underType.push(horizontalSpacer, mtcSelect());
      break;

    case "Song Select":
      underType.push(horizontalSpacer, songSelect());
      break;

    default:
  }

  return (
    <div className="pickerTopDiv" style={mainDiv}>
      {/* <button onMouseDown={printState}>STATE</button> */}
      <table id={"pickerTable" + props.channel} style={{ width: "100%" }}>
        <colgroup>
          <col width="1px" />
        </colgroup>
        <tbody>
          <tr>
            <td colSpan="2" style={pickerTitle}>
              Input Command Picker
            </td>
          </tr>
          {horizontalSpacer}
          <tr>
            <td>
              <div id="typeLbl" style={label}>
                <b style={label}>Type:</b>
              </div>
            </td>
            <td>
              <div id="typeDiv">
                <Select
                  name="typeSelector"
                  styles={selectStyle}
                  hideResetButton="true"
                  style={{ textAlign: "left" }}
                  options={inputTypesDropDown()}
                  value={state.type}
                  theme="default"
                  onChange={e => {
                    handleTypeChange(e);
                  }}
                />
              </div>
            </td>
          </tr>
          {spacer}
          {underType}
        </tbody>
      </table>
    </div>
  );
}

// Style ////////////////////////////////////////////
const mainDiv = {
  backgroundColor: "lightgrey",
  padding: "8px",
  maxWidth: "500px",
  borderRadius: "10px",
  margin: "4px",
  fontSize: "12px",
};

const td = {
  border: "1px black solid",
};

const pickerTitle = {
  //border: '1px black solid',
  padding: "2px",
  textAlign: "center",
};

const selectStyle = {
  control: base => ({
    ...base,
    fontSize: "12px",
    minHeight: "15px",
  }),
  menu: base => ({
    ...base,
    fontSize: "12px",
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: "0px 8px",
  }),
  valueContainer: base => ({
    ...base,
    padding: "0px 8px",
  }),
};

const label = {
  textAlign: "right",
  paddingLeft: "5px",
  fontSize: "12px",
};

const rangeDiv = {
  marginTop: "10px",
  padding: "0px 10px",
};
//////////////////////////////////////////// Style //
