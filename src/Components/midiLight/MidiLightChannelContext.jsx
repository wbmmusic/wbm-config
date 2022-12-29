import React, { useState, createContext } from "react";

export const MidiLightChannelContext = createContext();

export const MidiLightChannelProvider = props => {
  const [channel, setChannel] = useState({
    name: "Name This Channel",
    ledData: {
      color: [200, 100, 50], //HSL
      type: {
        label: "Solid",
        value: 0,
      },
      sliderval: 20,
      rise: 15,
      fall: 30,
      drtn: 45,
      len: 60,
      freq: 75,
      low: 90,
    },
    commands: [],
  });

  return (
    <MidiLightChannelContext.Provider value={[channel, setChannel]}>
      {props.children}
    </MidiLightChannelContext.Provider>
  );
};
