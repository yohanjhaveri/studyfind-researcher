import { datetime } from "utils";

import { Tooltip, Text } from "@chakra-ui/react";
import { useContext } from "react";
import MediaContext from "context/MediaContext";

function NotificationTime({ time }) {
  const displayTime = datetime.get12HourTime(time);
  const displayDate = datetime.getFriendlyDate(time);
  const relativeTime = datetime.getRelativeTime(time);

  const { isPhone } = useContext(MediaContext);

  return (
    <Tooltip label={`${displayDate} at ${displayTime}`}>
      <Text
        cursor="pointer"
        fontSize={isPhone ? "14px" : "12px"}
        marginBottom={isPhone && "4px"}
        color="gray.400"
      >
        {relativeTime}
      </Text>
    </Tooltip>
  );
}

export default NotificationTime;
