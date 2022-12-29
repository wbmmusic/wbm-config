import React, { useState, useEffect } from "react";

export default function NameInput(props) {
  const [over, setOver] = useState(false);
  const [focus, setFocus] = useState(false);

  var inStyle = {
    textAlign: "center",
    backgroundColor: "transparent",
    border: "none",
    padding: "3px 3px",
    borderRadius: "3px",
  };

  useEffect(() => {
    if (over) setOver(true);
    else setOver(false);
  }, [over]);

  useEffect(() => {
    if (focus) setFocus(true);
    else setFocus(false);
  }, [focus]);

  function handelEvent(e) {
    switch (e.type) {
      case "change":
        props.setValue(e.target.value);
        break;

      case "focus":
        setFocus(true);
        break;

      case "blur":
        setFocus(false);
        break;

      case "mouseover":
        setOver(true);
        break;

      case "mouseout":
        setOver(false);
        break;

      default:
        break;
    }
  }

  if (over) {
    inStyle.border = "1px lightgrey solid";
    inStyle.padding = "2px 2px";
  }

  if (focus) {
    inStyle.backgroundColor = "white";
  }

  return (
    <div>
      <input
        type="text"
        value={props.value}
        onMouseOver={handelEvent}
        onMouseOut={handelEvent}
        onChange={handelEvent}
        onFocus={handelEvent}
        onBlur={handelEvent}
        style={inStyle}
      />
    </div>
  );
}
