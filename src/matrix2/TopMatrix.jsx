import React, { useState } from "react";
import Matrix from "./Matrix";
import Output from "./Output";
import Input from "./Input";

export default function TopMatrix() {
  const [state, setState] = useState({
    numberOfInputs: 2,
    numberOfOutouts: 3,
    overCell: {
      row: "",
      col: "",
    },
  });

  const makeTopTable = () => {
    let table = [];
    let cells = [];

    for (var row = 0; row <= state.numberOfInputs; row++) {
      for (var col = 0; col <= state.numberOfOutouts; col++) {
        if (row === 0) {
          if (col === 0) {
            cells.push(<td key="topLeftEmpty"></td>);
          } else {
            cells.push(
              <td key={"output" + col}>
                <Output
                  data={{
                    startCol: (col - 1) * 16,
                  }}
                />
              </td>
            );
          }
        } else {
          if (col === 0) {
            cells.push(
              <td key={"input" + row}>
                <Input
                  data={{
                    startRow: (row - 1) * 16,
                  }}
                />
              </td>
            );
          } else {
            cells.push(
              <td key={"matrixIn" + row + "Out" + col}>
                <Matrix
                  data={{
                    startCol: (col - 1) * 16,
                    startRow: (row - 1) * 16,
                    cols: 16,
                    rows: 16,
                  }}
                />
              </td>
            );
          }
        }
      }

      table.push(<tr key={"matrixRow" + row}>{cells}</tr>);

      cells = [];
    }

    return table;
  };

  return (
    <div style={{ alignContent: "center" }}>
      Top Matrix
      <hr />
      <table>
        <tbody>{makeTopTable()}</tbody>
      </table>
    </div>
  );
}
