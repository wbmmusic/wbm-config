import React, { Component } from "react";

export class matrixCell extends Component {
  state = {
    selected: false,
    bgColor: "#333",
  };

  handleChange = () => {
    //console.log('A patch cell has been clicked')
    if (this.state.selected) {
      this.setState({
        bgColor: "#333",
        selected: false,
      });
    } else {
      this.setState({
        bgColor: "#888",
        selected: true,
      });
    }
  };

  handleOver = () => {
    //console.log('A patch cell has been clicked')
    if (this.state.selected) {
      this.setState({
        bgColor: "red",
      });
    } else {
      this.setState({
        bgColor: "green",
      });
    }
  };

  handleOut = () => {
    //console.log('A patch cell has been clicked')
    if (this.state.selected) {
      this.setState({
        bgColor: "#888",
      });
    } else {
      this.setState({
        bgColor: "#333",
      });
    }
  };

  render() {
    return (
      <td
        onMouseDown={this.handleChange}
        onMouseOver={this.handleOver}
        onMouseOut={this.handleOut}
        style={{
          backgroundColor: this.state.bgColor,
          padding: "8px",
        }}
      ></td>
    );
  }
}

export default matrixCell;
