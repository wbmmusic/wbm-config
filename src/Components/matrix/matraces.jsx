import React, { Component } from "react";
import Matrix from "./matrix";
import Input from "./input";
import Output from "./output";

export class matraces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: this.props.device,
    };
  }

  render() {
    let cols = [];
    for (var i = 0; i < this.props.device.numberOfOutputs + 1; i++) {
      let rowID = `grid-col${i}`;
      let cell = [];
      for (var idx = 0; idx < this.props.device.numberOfInputs + 1; idx++) {
        let cellID = `matrix${i}-${idx}`;

        if (i === 0 && idx === 0) {
          cell.push(<div key={cellID} id="dummy" style={griditemheader}></div>);
        } else if (i > 0 && idx === 0) {
          cell.push(
            <div key={cellID} id={"out" + i} style={griditemheader}>
              <Output
                cols={this.props.device.numberOfOutputPatches}
                outputName={this.props.device.outputNames[i - 1]}
                usrOutputName={this.props.device.usrOutputNames[i - 1]}
              />
            </div>
          );
        } else if (i === 0 && idx > 0) {
          cell.push(
            <div key={cellID} id={"in" + i} style={gridcolfixedleft}>
              <Input rows={this.props.device.numberOfInputPatches} />
            </div>
          );
        } else {
          cell.push(
            <div key={cellID} id={cellID} style={td}>
              <Matrix
                cols={this.props.device.numberOfOutputPatches}
                rows={this.props.device.numberOfInputPatches}
              />
            </div>
          );
        }
      }
      cols.push(
        <div key={i} id={rowID} style={rowstyle}>
          {cell}
        </div>
      );
    }
    return (
      <div id="gridContainer" style={gridcontainer}>
        <div id="grid" style={grid}>
          {cols}
        </div>
      </div>
    );
  }
}

const td = {
  //border: "1px black solid",
};

const rowstyle = {
  //border: "1px black solid",
};

/*
const theTable = {
    //border: "1px black solid",
    overflow: 'auto',
    height: '70vh',
    backgroundColor: '#444',
    display: 'block',
}
*/

const griditemheader = {
  height: "75px",
  minHeight: "75px",

  position: "sticky",
  //position: '-webkit-sticky',
  background: "rgb(180, 180, 180)",
  top: "0",
};

const gridcolfixedleft = {
  position: "sticky",
  left: "0",
  zIndex: "9998",
  background: "rgb(180, 180, 180)",
};

const gridcontainer = {
  display: "grid",
  /* This is a (hacky) way to make the .grid element size to fit its content */
  overflow: "auto",
  width: "100%",
};

const grid = {
  display: "flex",
  flexWrap: "nowrap",
};

export default matraces;
