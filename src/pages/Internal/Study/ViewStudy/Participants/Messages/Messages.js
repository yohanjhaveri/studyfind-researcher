import { useEffect, useRef } from "react";
import { usePagination, usePathParams } from "hooks";
import { auth, firestore } from "database/firebase";
import { message } from "database/mutations";

import { Grid } from "@chakra-ui/react";
import { Loader } from "components";

import MessageList from "components/feature/Messages/MessageList";
import MessageInput from "components/feature/Messages/MessageInput";

function Messages() {
  const { studyID, participantID } = usePathParams();

  const bottomRef = useRef();

  const messagesQuery = firestore
    .collection("studies")
    .doc(studyID)
    .collection("participants")
    .doc(participantID)
    .collection("messages")
    .orderBy("time", "desc");

  const {
    documents: messages,
    loading,
    error,
    loadingMore,
    handleLoadMore,
    fetchedAll,
  } = usePagination(messagesQuery, 10);

  const scrollToBottom = () => {
    bottomRef?.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleMessageSend = (text) => {
    return message.send(studyID, participantID, { text }).then(() => scrollToBottom());
  };

  const handleMessageRead = (messageID) => {
    return message.read(studyID, participantID, messageID);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Grid height="100%" gridTemplateRows="1fr 49px">
      <MessageList
        uid={auth.currentUser.uid}
        messages={messages.slice().reverse()}
        fetchedAll={fetchedAll}
        loadingMore={loadingMore}
        handleLoadMore={handleLoadMore}
        handleMessageRead={handleMessageRead}
        bottomRef={bottomRef}
      />
      <MessageInput handleMessageSend={handleMessageSend} />
    </Grid>
  );
}

export default Messages;
