import React, { Component } from "react";
import InNumbers from "./inNumbers";

export class input extends Component {
  render() {
    return (
      <table style={tblStyle}>
        <tbody>
          <tr>
            <td style={td}>Input</td>
            <td style={td}>
              <InNumbers rows={this.props.rows} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const tblStyle = {
  marginTop: "-2.5px",
  marginBottom: "-5.5px",
};

const td = {
  //display: 'inline-block',
  //backgroundColor: 'red',
  verticalAlign: "middle",
  cursor: "context-menu",
};

export default input;
