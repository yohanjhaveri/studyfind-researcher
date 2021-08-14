import { Text, Avatar, Badge, Flex } from "@chakra-ui/react";
import { ActionButton } from "components";
import {
  FaClock,
  FaCalendar,
  FaClipboard,
  FaStickyNote,
  FaComment,
} from "react-icons/fa";

// import ParticipantDrawer from "./ParticipantDrawer";

// import Status from "./Status/Status";
// import Screening from "./Screening/Screening";
// import Meetings from "./Meetings/Meetings";
// import Reminders from "./Reminders/Reminders";
// import Notes from "./Notes/Notes";
// import Messages from "./Messages/Messages";

function ParticipantsItem({ participant, handleOpen }) {
  const statusColors = {
    interested: "gray",
    screened: "purple",
    consented: "cyan",
    accepted: "green",
    rejected: "red",
  };

  return (
    <Flex align="center" gridGap="10px" padding="10px">
      <Avatar
        size="1rem"
        width="30px"
        height="30px"
        color="white"
        background="blue.500"
        name={participant.fakename}
      />
      <Text fontWeight="500" mr="auto">
        {participant.fakename}
      </Text>
      <Badge
        size="sm"
        cursor="pointer"
        colorScheme={statusColors[participant.status]}
        onClick={() => handleOpen(participant.id, "status")}
      >
        {participant.status}
      </Badge>
      <Text color="gray.400" w="100px" textAlign="right">
        {participant.score}% eligible
      </Text>
      <Flex align="center" gridGap="5px">
        <ActionButton
          hint="Messages"
          icon={<FaComment />}
          onClick={() => handleOpen(participant.id, "messages")}
        />
        <ActionButton
          hint="Screening"
          icon={<FaClipboard />}
          onClick={() => handleOpen(participant.id, "screening")}
        />
        <ActionButton
          hint="Meetings"
          icon={<FaCalendar />}
          onClick={() => handleOpen(participant.id, "meetings")}
        />
        <ActionButton
          hint="Reminders"
          icon={<FaClock />}
          onClick={() => handleOpen(participant.id, "reminders")}
        />
        <ActionButton
          hint="Notes"
          icon={<FaStickyNote />}
          onClick={() => handleOpen(participant.id, "notes")}
        />
      </Flex>
    </Flex>
  );
}

export default ParticipantsItem;
