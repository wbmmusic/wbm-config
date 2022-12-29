import React, { useState } from "react";

export default function DeviceMenuItem(props) {
  const [topExpand, setTopExpand] = useState(false);

  const toggleTop = () => {
    setTopExpand(!topExpand);
  };

  let topArrow = "> ";
  if (topExpand) {
    topArrow = "v ";
  }

  return (
    <div style={{ borderBottom: "1px solid black" }}>
      <div onClick={toggleTop}>
        {topArrow}
        {props.data.info.Model}
      </div>
    </div>
  );
}
