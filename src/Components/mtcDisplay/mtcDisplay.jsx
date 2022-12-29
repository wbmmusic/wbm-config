import React, { Component } from "react";

export class mtcDisplay extends Component {
  render() {
    return (
      <div
        className="mainDiv"
        style={{
          border: "2px black solid",
          boxShadow: "1px 1px 6px",
          display: "inline-block",
        }}
      >
        <table>
          <tbody>
            <tr>
              <td className="hourCell" style={digitsCell}>
                <b>{this.props.hours}</b>
              </td>
              <td style={spacer}>
                <b>:</b>
              </td>
              <td className="minuteCell" style={digitsCell}>
                <b>{this.props.minutes}</b>
              </td>
              <td style={spacer}>
                <b>:</b>
              </td>
              <td className="secondCell" style={digitsCell}>
                <b>{this.props.seconds}</b>
              </td>
              <td style={spacer}>
                <b>:</b>
              </td>
              <td className="frameCell" style={digitsCell}>
                <b>{this.props.frames}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const digitsCell = {
  //border: '2px black solid',
  width: "110px",
  fontSize: "80px",
  userSelect: "none",
};

const spacer = {
  //border: '2px black solid',
  fontSize: "80px",
  paddingBottom: "15px",
  userSelect: "none",
};

export default mtcDisplay;
