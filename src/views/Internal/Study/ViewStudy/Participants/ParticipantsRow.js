import React, { useState } from "react";
import styled from "styled-components";

import { Text, Avatar, Badge, useDisclosure } from "@chakra-ui/react";
import { FaClock, FaCalendar, FaClipboard, FaStickyNote, FaComment } from "react-icons/fa";

import ParticipantDrawer from "./ParticipantDrawer";
import ParticipantActionButton from "./ParticipantActionButton";

import Status from "./Status/Status";
import Screening from "./Screening/Screening";
import Meetings from "./Meetings/Meetings";
import Reminders from "./Reminders/Reminders";
import Notes from "./Notes/Notes";

function ParticipantsRow({ study, participant }) {
  const statusColors = {
    interested: "gray",
    screened: "purple",
    consented: "cyan",
    accepted: "green",
    rejected: "red",
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [action, setAction] = useState("");

  const handleCancel = () => {
    setAction("");
    onClose();
  };

  const handleAction = (a) => {
    setAction(a);
    onOpen();
  };

  return (
    <Row>
      <Avatar
        size="1rem"
        h="30px"
        w="30px"
        bg="blue.500"
        name={participant.fakename.split("")[0]}
      />
      <Text fontWeight="500" mr="auto">
        {participant.fakename}
      </Text>
      <Badge
        size="sm"
        cursor="pointer"
        colorScheme={statusColors[participant.status]}
        onClick={() => handleAction("status", participant.id)}
      >
        {participant.status}
      </Badge>
      <Text color="gray.400" w="100px" textAlign="right">
        {participant.score}% eligible
      </Text>
      <Buttons>
        <ParticipantActionButton name="message" icon={<FaComment />} handleAction={handleAction} />
        <ParticipantActionButton
          name="screening"
          icon={<FaClipboard />}
          handleAction={handleAction}
        />
        <ParticipantActionButton
          name="meetings"
          icon={<FaCalendar />}
          handleAction={handleAction}
        />
        <ParticipantActionButton name="reminders" icon={<FaClock />} handleAction={handleAction} />
        <ParticipantActionButton name="notes" icon={<FaStickyNote />} handleAction={handleAction} />
      </Buttons>
      <ParticipantDrawer
        action={action}
        fakename={participant.fakename}
        onClose={handleCancel}
        isOpen={isOpen}
      >
        {action === "status" && <Status participant={participant} onClose={onClose} />}
        {action === "screening" && (
          <Screening questions={study.questions} responses={participant.responses} />
        )}
        {action === "meetings" && <Meetings participant={participant} study={study} />}
        {action === "reminders" && <Reminders participant={participant} study={study} />}
        {action === "notes" && <Notes id={participant.id} />}
      </ParticipantDrawer>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  padding: 10px;

  border-bottom: 1px solid #f1f2f3;

  &:last-child {
    border-bottom: none;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 5px;
`;

export default ParticipantsRow;
