import React from "react";
import styled from "styled-components";
import { Button, Heading } from "@chakra-ui/react";
import { Textarea } from "components";
import DescriptionAccessibilityScore from "views/Internal/Study/DescriptionAccessibilityScore";

function DetailsEdit({ original, inputs, errors, handleChange, handleCancel, handleSubmit }) {
  return (
    <>
      <Head>
        <Heading fontSize="28px">Edit Details</Heading>
        <Buttons>
          <Button
            colorScheme=""
            color="gray.500"
            bg="gray.200"
            _hover={{ bg: "gray.300" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          {JSON.stringify(inputs) !== JSON.stringify(original) ? (
            <Button colorScheme="green" onClick={handleSubmit}>
              Save Changes
            </Button>
          ) : null}
        </Buttons>
      </Head>
      <Inputs>
        <Textarea
          label="Study Title"
          name="title"
          value={inputs.title}
          error={errors.title}
          limit={100}
          height="60px"
          onChange={handleChange}
        />
        <Textarea
          label="Study Description"
          name="description"
          value={inputs.description}
          error={errors.description}
          limit={500}
          height="150px"
          onChange={handleChange}
        />
        <DescriptionAccessibilityScore description={inputs.description} />
      </Inputs>
    </>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

const Inputs = styled.div`
  display: grid;
  padding-top: 10px;
  grid-gap: 10px;
`;

const Buttons = styled.div`
  display: flex;
  grid-gap: 10px;
  justify-content: flex-end;
`;

export default DetailsEdit;