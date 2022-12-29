import React from "react";
import MatrixCell from "./MatrixCell";

export default function Matrix(props) {
  const makeTable = () => {
    let table = [];
    let cells = [];
    for (var row = 0; row < props.data.rows; row++) {
      for (var col = 0; col < props.data.cols; col++) {
        cells.push(
          <td
            key={
              "Row" +
              (props.data.startRow + row) +
              "col" +
              (props.data.startCol + col)
            }
          >
            <MatrixCell
              row={props.data.startRow + row}
              col={props.data.startCol + col}
              data={false}
            />
          </td>
        );
      }

      table.push(<tr key={"inputChannel" + row}>{cells}</tr>);
      cells = [];
    }
    return table;
  };

  return (
    <table>
      <tbody>{makeTable()}</tbody>
    </table>
  );
}
