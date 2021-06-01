import React from "react";
import { Message } from "components";

function MeetingsEmpty() {
  return (
    <Message
      title="Nothing to see here"
      description="You don't have any meetings on this day"
      my="10px"
    />
  );
}

export default MeetingsEmpty;
