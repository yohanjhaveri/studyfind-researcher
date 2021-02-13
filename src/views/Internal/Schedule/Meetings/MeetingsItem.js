import React from "react";
import moment from "moment";

import { firestore } from "database/firebase";
import { useDocument } from "hooks";

import { Tooltip, Flex, Text, IconButton, useDisclosure, Icon, Box } from "@chakra-ui/react";
import { FaInfoCircle, FaPencilAlt, FaPhone, FaTrashAlt } from "react-icons/fa";

import MeetingsForm from "./MeetingsForm.js";
import ParticipantDrawer from "views/Internal/Study/ViewStudy/Participants/ParticipantDrawer.js";

function MeetingsItem({ meeting }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [participant, loading, error] = useDocument(
    firestore
      .collection("studies")
      .doc(meeting.studyID)
      .collection("participants")
      .doc(meeting.participantID)
  );

  const handleDelete = () => {
    firestore.collection("meetings").doc(meeting.id).delete();
  };

  const meetingInfo = (
    <>
      <Text>Study: {meeting.studyID}</Text>
      <Text>Participant: {participant && participant.fakename}</Text>
    </>
  );

  return (
    <Flex align="center" gridGap="8px" borderWidth="1px" p="10px 12px" rounded="md" bg="white">
      <ParticipantDrawer
        action="Meetings"
        fakename={participant && participant.fakename}
        onClose={onClose}
        isOpen={isOpen}
      >
        <MeetingsForm meeting={meeting} onClose={onClose} />
      </ParticipantDrawer>
      <Text fontSize="0.9rem" color="gray.500" width="64px" textAlign="right">
        {moment(meeting.time).format("hh:mma")}
      </Text>
      <Text fontWeight="500">{meeting.name}</Text>
      <Tooltip label={meetingInfo}>
        <Flex align="center" color="gray.400">
          <Icon as={FaInfoCircle} />
        </Flex>
      </Tooltip>
      <Flex gridGap="4px" ml="auto">
        <a href={meeting.link} target="_blank" rel="noreferrer">
          <IconButton
            icon={<FaPhone />}
            size="sm"
            color="green.500"
            bg="green.100"
            _hover={{ bg: "green.200" }}
          />
        </a>
        <IconButton
          icon={<FaPencilAlt />}
          size="sm"
          color="blue.500"
          bg="blue.100"
          _hover={{ bg: "blue.200" }}
          onClick={onOpen}
        />
        <IconButton
          icon={<FaTrashAlt />}
          size="sm"
          color="red.500"
          bg="red.100"
          _hover={{ bg: "red.200" }}
          onClick={handleDelete}
        />
      </Flex>
    </Flex>
  );
}

export default MeetingsItem;
