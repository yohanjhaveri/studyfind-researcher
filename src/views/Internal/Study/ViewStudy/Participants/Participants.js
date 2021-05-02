import React, { useState, useEffect } from "react";

import { compute } from "functions";
import { firestore } from "database/firebase";
import { useCollection } from "hooks";
import { useParams } from "react-router-dom";

import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { Message, Loader } from "components";

import ParticipantsFilter from "./ParticipantsFilter";
import ParticipantsRow from "./ParticipantsRow";

function Participants({ study }) {
  const { studyID } = useParams();
  const [toggle, setToggle] = useState(false);
  const [participants, loading] = useCollection(
    firestore.collection("studies").doc(studyID).collection("participants")
  );
  const [participantsFiltered, setParticipantsFiltered] = useState([]);

  const [sort, setSort] = useState("eligibility");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState({
    interested: true,
    screened: true,
    consented: true,
    accepted: true,
    rejected: true,
  });

  useEffect(() => {
    if (!toggle) {
      setSearch("");
      setSort("fakename");
      setStatus({
        interested: true,
        screened: true,
        consented: true,
        accepted: true,
        rejected: true,
      });
    }
  }, [toggle]);

  useEffect(() => {
    if (participants) {
      const initial = participants.map((p) => ({
        ...p,
        score: compute.eligibilityScore(study.questions, p.responses),
      }));
      const filteredSearch = filterSearch(initial);
      const filteredStatus = filterStatus(filteredSearch);
      const sorted = sortParticipants(filteredStatus);
      setParticipantsFiltered(sorted);
    }
  }, [sort, status, search, participants]);

  const sortParticipants = (participants) => {
    if (sort === "eligibility") return sortByEligiblity(participants);
    if (sort === "status") return sortByStatus(participants);
    return participants;
  };

  const sortByStatus = (participants) => {
    const order = ["interested", "screened", "consented", "accepted", "rejected"];
    participants.sort((a, b) => {
      const statusA = order.indexOf(a.status);
      const statusB = order.indexOf(b.status);
      if (statusA > statusB) {
        return 1;
      } else if (statusA < statusB) {
        return -1;
      } else {
        return 0;
      }
    });
    return participants;
  };

  const sortByEligiblity = (participants) => {
    participants.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      } else if (a.score > b.score) {
        return -1;
      } else {
        return 0;
      }
    });
    return participants;
  };

  const filterStatus = (participants) => {
    return participants.filter((p) => status[p.status]);
  };

  const filterSearch = (participants) => {
    return participants.filter((p) => p.fakename.toLowerCase().includes(search));
  };

  if (loading) {
    return (
      <Box h="500px">
        <Loader />
      </Box>
    );
  }

  if (!participants || !participants.length) {
    return (
      <Box h="500px">
        <Message
          title="Find Participants"
          description="Your study does not have any participants yet!"
        />
      </Box>
    );
  }

  return (
    <>
      <Flex justify="space-between" align="center" my="15px">
        <Heading fontSize="28px">Participants</Heading>
        {toggle ? (
          <Button color="gray.500" onClick={() => setToggle(false)}>
            Clear Filters
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={() => setToggle(true)}>
            Filter Participants
          </Button>
        )}
      </Flex>
      {toggle && (
        <ParticipantsFilter
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          sort={sort}
          setSort={setSort}
        />
      )}
      <Box borderWidth="1px" rounded="md" overflow="hidden" bg="white">
        {participantsFiltered && participantsFiltered.length ? (
          participantsFiltered.map((participant, index) => (
            <ParticipantsRow key={index} study={study} participant={participant} />
          ))
        ) : (
          <Box h="500px">
            <Message
              status="failure"
              title="Empty Filter Results"
              description="Your filters matched no participants"
            />
          </Box>
        )}
      </Box>
    </>
  );
}

export default Participants;
