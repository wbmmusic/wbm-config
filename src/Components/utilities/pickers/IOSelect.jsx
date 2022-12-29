import React from "react";

const bit_test = (num, bit) => {
  return (num >> bit) % 2 !== 0;
};

const bit_set = (num, bit) => {
  return num | (1 << bit);
};

const bit_toggle = (num, bit) => {
  return (num ^= 1 << bit);
};

export default function InputSelect(props) {
  const handleClick = e => {
    var tempData = props.data.selection;

    if (e.target.id === "ALL") {
      var allSelected = true;
      for (var i = 0; i < props.data.ins; i++) {
        if (!bit_test(tempData, i)) {
          allSelected = false;
          break;
        }
      }

      if (allSelected) {
        props.sendData(0);
      } else {
        for (var x = 0; x < props.data.ins; x++) {
          tempData = bit_set(tempData, x);
        }
        props.sendData(tempData);
      }
    } else {
      var pressed = parseInt(e.target.innerHTML) - 1;
      props.sendData(bit_toggle(tempData, pressed));
    }
  };

  const makeTable = () => {
    let tbl = [];

    for (var i = 0; i <= props.data.ins; i++) {
      var cellSty = {
        border: "1px solid black",
        cursor: "pointer",
        borderRadius: "5px",
        backgroundColor: "white",
        textAlign: "center",
      };

      // A channel Button
      if (i > 0) {
        if (bit_test(props.data.selection, i - 1)) {
          cellSty.backgroundColor = "lightgreen";
        }

        tbl.push(
          <td
            key={"channelButton" + i + props.id}
            style={cellSty}
            onMouseDown={handleClick}
            id={i}
          >
            {i}
          </td>
        );

        // The All Button
      } else {
        let allSelected = true;
        for (var x = 0; x < props.data.ins; x++) {
          if (!bit_test(props.data.selection, x)) {
            allSelected = false;
          }
        }
        if (allSelected) {
          cellSty.backgroundColor = "lightgreen";
        }

        tbl.push(
          <td
            key={"allBtn" + props.id}
            style={cellSty}
            onMouseDown={handleClick}
            id="ALL"
          >
            ALL
          </td>
        );
      }
    }
    return tbl;
  };

  return (
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>{makeTable()}</tr>
      </tbody>
    </table>
  );
}
