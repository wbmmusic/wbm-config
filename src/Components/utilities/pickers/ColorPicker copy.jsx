import React, { useContext } from "react";

export default function ColorPicker(props) {
  const [channel, setChannel] = useContext(props.context);

  return (
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td>
            <div
              style={{
                pading: "10px",
                backgroundColor:
                  "hsl(" +
                  channel.ledData.color[0] +
                  "," +
                  channel.ledData.color[1] +
                  "%," +
                  channel.ledData.color[2] +
                  "%" +
                  ")",
              }}
            >
              yeah
            </div>
            <div>
              <canvas height="10px" width="100%"></canvas>
            </div>
            <div>
              <input
                type="range"
                style={{
                  width: "100%",
                }}
              />
            </div>
            <div>Brightness</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
