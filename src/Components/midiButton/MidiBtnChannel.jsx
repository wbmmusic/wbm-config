import React, { useContext, useEffect } from "react";
import NameInput from "../utilities/NameInput";
import MidiBtnButton from "./MidiBtnButton";
import CommandsContainer from "../utilities/pickers/CommandsContainer";
import { MidiButtonChannelContext } from "./Mid ButtonChannelContext";

export default function MidiBtnChannel(props) {
  const [channel, setChannel] = useContext(MidiButtonChannelContext);

  useEffect(() => {
    //console.log('Props Snapshot triggered update')
    if (props.snapshot !== undefined) {
      let tempChannel = { ...props.snapshot };
      setChannel(tempChannel);
    }
  }, [props.snapshot]);

  useEffect(() => {
    //console.log('Channel ' + props.channel + ' send state')
    //console.log(channel)
    props.getChanelInfo(props.channel, channel);
  }, [channel]);

  const lblStyle = {};

  function setName(newName) {
    let tempChannel = { ...channel };
    tempChannel.name = newName;
    setChannel(tempChannel);
  }

  const getStructure = data => {
    let tempChannel = { ...channel };
    tempChannel.commands = data;
    setChannel(tempChannel);
  };

  return (
    <div style={{ width: "300px" }} className="channelstyle">
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ fontSize: "14px" }}>
              <b style={lblStyle}>Button #{props.channel}</b>
            </td>
          </tr>
          <tr>
            <td>
              <NameInput value={channel.name} setValue={setName} />
            </td>
          </tr>
          <tr>
            <td className="insetui">
              <MidiBtnButton channel={channel} context={channel} />
            </td>
          </tr>
          <tr>
            <td>
              <CommandsContainer
                direction="out"
                key="midiBtnCommandsContainer"
                sendCommands={getStructure}
                commands={channel.commands}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
