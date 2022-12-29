import React from "react";
import NameInput from "../Components/utilities/NameInput";

export default function Output(props) {
  const makeNumbers = () => {
    let cells = [];

    for (var i = 0; i < 16; i++) {
      cells.push(
        <td style={{ fontSize: "10px" }} key={"outputNumber" + (i + 1)}>
          <div
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: "white",
            }}
          >
            {i + 1}
          </div>
        </td>
      );
    }

    return <tr>{cells}</tr>;
  };

  return (
    <table style={{ backgroundColor: "red" }}>
      <tbody>
        <tr>
          <td colSpan="16">
            <NameInput value={"Output Name"} />
          </td>
        </tr>
        {makeNumbers()}
      </tbody>
    </table>
  );
}
