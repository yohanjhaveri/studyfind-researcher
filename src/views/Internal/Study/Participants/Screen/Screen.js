import React from "react";
import styled from "styled-components";

import { Heading, Button, Tag, Text } from "@chakra-ui/react";

function Screen({ questions, responses }) {
  responses = [
    "Yes",
    "No",
    "I don't know",
    "No",
    "I don't know",
    "No",
    "Yes",
    "Yes",
    "No",
    "I don't know",
    "No",
    "I don't know",
    "No",
    "Yes",
    "Yes",
    "No",
    "I don't know",
    "No",
    "I don't know",
  ];
  return (
    <>
      <Head>
        <Heading fontSize="28px">Survey</Heading>
        <Button colorScheme="blue">Edit Questions</Button>
      </Head>
      <Table>
        <thead>
          <tr>
            <HeadCell>Type</HeadCell>
            <HeadCell>Question</HeadCell>
            <HeadCell>Response</HeadCell>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <BodyCell nowrap>
                <Tag colorScheme={question.type === "Inclusion" ? "green" : "red"}>
                  {question.type}
                </Tag>
              </BodyCell>
              <BodyCell nowrap>
                <Text color="gray.600">{question.prompt}</Text>
              </BodyCell>
              <BodyCell nowrap>
                <Text color="gray.600">{responses[index]}</Text>
              </BodyCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

const Table = styled.table`
  width: 100%;
  background: white;
`;

const HeadCell = styled.th`
  border: 1px solid #e1e2e3;
  background: #f1f2f3;
  padding: 8px 12px;
  text-align: left;
`;

const BodyCell = styled.td`
  border: 1px solid #e1e2e3;
  padding: 8px 12px;
`;

export default Screen;
