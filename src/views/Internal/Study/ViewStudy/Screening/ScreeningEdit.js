import React from "react";
import styled from "styled-components";
import { Heading, Button, IconButton } from "@chakra-ui/react";
import { Input, Select } from "components";
import { FaTrash, FaPlus } from "react-icons/fa";
import { ReactSortable } from "react-sortablejs";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { SortableHandle } from "react-sortable-hoc";
import { AiOutlineDrag } from "react-icons/ai";

function ScreeningEdit({
  original,
  questions,
  handleCancel,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  deleteAllQuestions,
  handleSubmit,
  setQuestions,
}) {
  const DragHandle = SortableHandle(() => (
    <IconButton colorScheme="" color="gray.500" icon={<AiOutlineDrag />} />
  ));
  const SortableItem = SortableElement(({ value, index }) => (
    <Row key={index}>
      <DragHandle />
      <Select
        w="210px"
        name="type"
        value={value.type}
        onChange={(name, value) => updateQuestion(index, name, value)}
        options={["Inclusion", "Exclusion"]}
      />
      <Input
        placeholder="Question Prompt"
        name="prompt"
        value={value.prompt}
        onChange={(name, value) => updateQuestion(index, name, value)}
      />
      <IconButton
        colorScheme=""
        color="gray.500"
        _hover={{ color: "red.500", bg: "red.100" }}
        icon={<FaTrash />}
        onClick={() => deleteQuestion(index)}
      />
    </Row>
  ));
  const onSortEnd = ({ oldIndex, newIndex }) => {
    let newArray = [...questions];
    const removed = newArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, removed[0]);
    setQuestions(newArray);
  };
  const SortableList = SortableContainer(({ items }) => {
    return (
      <ul>
        {items.map((value, index) => (
          <>
            <SortableItem key={index} index={index} value={value} />
          </>
        ))}
      </ul>
    );
  });

  return (
    <>
      <Head>
        <Heading fontSize="28px">Edit Screening</Heading>
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
          {questions && questions.length ? (
            <Button colorScheme="red" onClick={deleteAllQuestions}>
              Delete All
            </Button>
          ) : null}
          {JSON.stringify(questions) !== JSON.stringify(original) ? (
            <Button colorScheme="green" onClick={handleSubmit}>
              Save Changes
            </Button>
          ) : null}
        </Buttons>
      </Head>
      <Questions>
        {/* {questionComponents} */}
        <SortableList items={questions} useDragHandle onSortEnd={onSortEnd} />;
        <Button leftIcon={<FaPlus />} color="gray.500" onClick={createQuestion}>
          Add Question
        </Button>
      </Questions>
    </>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

const Row = styled.div`
  display: flex;
  grid-gap: 10px;
  width: 100%;
`;

const Questions = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 10px;
`;

const Buttons = styled.div`
  display: flex;
  grid-gap: 10px;
`;

export default ScreeningEdit;
