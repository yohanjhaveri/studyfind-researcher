import { useState } from "react";
import { useColor } from "hooks";
import { Flex } from "@chakra-ui/react";
import { Form, TextInput } from "components";
import { FaPaperPlane } from "react-icons/fa";
import { ActionButton } from "components/simple/Buttons/ActionButton";

function MessageInput({ handleMessageSend }) {
  const [text, setText] = useState("");

  const handleChange = (_, value) => {
    setText(value);
  };

  const handleSubmit = () => {
    handleMessageSend(text);
  };

  const background = useColor("white", "gray.900");
  const borderColor = useColor("gray.200", "gray.700");

  return (
    <Form onSubmit={handleSubmit}>
      <Flex
        background={background}
        borderTopWidth="1px"
        borderTopColor={borderColor}
        width="100%"
        align="center"
        padding="4px"
        gridGap="4px"
      >
        <TextInput
          value={text}
          onChange={handleChange}
          placeholder="Type your message here..."
          borderWidth="0"
        />
        <ActionButton
          size="md"
          type="submit"
          background="transparent"
          icon={<FaPaperPlane />}
        />
      </Flex>
    </Form>
  );
}

export default MessageInput;
