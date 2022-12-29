import React, { Component } from "react";
import MatrixCell from "./matrixCell";
import { v4 as uuid } from "uuid";

export class matrix extends Component {
  state = {
    cols: this.props.cols,
    rows: this.props.rows,
    count: 0,
    patches: [],
  };

  onClick() {
    this.setState(state => ({
      count: state.count + 1,
    }));
    console.log("clicked");
  }

  render() {
    let rows = [];
    for (var i = 0; i < this.state.rows; i++) {
      let rowID = `row${i}`;
      let cell = [];
      for (var idx = 0; idx < this.state.cols; idx++) {
        let cellID = `row${i} col${idx}`;
        cell.push(<MatrixCell key={uuid()} />);

        this.state.patches.indexOf({ id: cellID }) === -1
          ? this.state.patches.push({ id: cellID })
          : console.log("This item already exists");
      }
      rows.push(
        <tr key={i} id={rowID} style={rowstyle}>
          {cell}
        </tr>
      );
    }
    return (
      <table style={theTable}>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

const rowstyle = {
  display: "block",
  lineHeight: "1px",
};

const theTable = {
  display: "block",
  tableLayout: "fixed",
};

export default matrix;
