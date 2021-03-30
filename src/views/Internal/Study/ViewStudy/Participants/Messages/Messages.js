import React, { useState, useEffect, useRef } from "react";

import { useCollection } from "hooks";
import { useParams } from "react-router-dom";
import { auth, firestore } from "database/firebase";

import { Box, Text, Input, Grid, Flex, Badge, Radio, RadioGroup, Button } from "@chakra-ui/react";
import Message from "./Message";
import { Loader } from "components";

function Messages({ participant }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [fetchedAll, setFetchedAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const { nctID } = useParams();

  const handleFetchInitial = async () => {
    const MESSAGES_PER_REQUEST = 10;
    const lastDoc = documents.length && messages.length ? documents[documents.length - 1] : "";
    setLoading(true);

    try {
      const snapshot = await firestore
        .collection("studies")
        .doc(nctID)
        .collection("participants")
        .doc(participant.id)
        .collection("messages")
        .orderBy("time", "desc")
        .limit(MESSAGES_PER_REQUEST)
        .get();

      snapshot.forEach((doc) => {
        documents.push(doc);
        messages.push({ id: doc.id, ...doc.data() });
      });

      if (documents.length < MESSAGES_PER_REQUEST) {
        setFetchedAll(true);
      }
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  };

  const handleFetchAdditional = async () => {
    const MESSAGES_PER_REQUEST = 10;
    const lastDoc = documents.length && messages.length ? documents[documents.length - 1] : "";
    setLoading(true);

    try {
      const snapshot = await firestore
        .collection("studies")
        .doc(nctID)
        .collection("participants")
        .doc(participant.id)
        .collection("messages")
        .orderBy("time", "desc")
        .startAfter(lastDoc)
        .limit(MESSAGES_PER_REQUEST)
        .get();

      const collections = [];
      const docs = [];

      snapshot.forEach((doc) => {
        docs.push(doc);
        collections.push({ id: doc.id, ...doc.data() });
      });

      setMessages((prev) => prev.concat(collections));
      setDocuments((prev) => prev.concat(docs));

      if (docs.length < MESSAGES_PER_REQUEST) {
        setFetchedAll(true);
      }
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  };

  //not sure how to use useCollection with pagination
  // const [messages, loading, error] = useCollection(
  //   firestore
  //     .collection("studies")
  //     .doc(nctID)
  //     .collection("participants")
  //     .doc(participant.id)
  //     .collection("messages")
  //     .orderBy("time", "desc")
  //     .limit(MESSAGES_PER_REQUEST)
  // );

  const handleChange = (event) => {
    setInput(event.target.value)
  };

  const handleSubmit = () => {
    firestore
      .collection("studies")
      .doc(nctID)
      .collection("participants")
      .doc(participant.id)
      .collection("messages")
      .add({
        text: input,
        read: false,
        time: Math.floor(new Date().getTime() / 1000),
        user: auth.currentUser.uid,
      });
    setInput("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current && messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(() => {
    handleFetchInitial()
    scrollToBottom()
  }, []);

  if (loading) return <Loader />;
  if (error) return <Text>Error: {JSON.stringify(error)}</Text>

  return (
    <>
      {messages && messages.map((message, index) => (
        <Message key={index} message={message} />
      )).reverse()}
      <Flex>
        <Input
          value={input}
          onChange={handleChange}
          placeholder="Type your message here"
          borderRadius="0"
        />
        <Button
          colorScheme="blue"
          borderRadius="0"
          onClick={() => handleSubmit()}>
          Send
        </Button>
      </Flex>
      <div ref={messagesEndRef} />
    </>
  );
}

export default Messages;
