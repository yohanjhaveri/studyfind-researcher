import React, { useState } from "react";
import { useArray } from "hooks";
import { updateStudy } from "database/studies";
import ScreenerView from "./ScreenerView";
import ScreenerEdit from "./ScreenerEdit";

function Screener({ study }) {
  const [edit, setEdit] = useState(false);

  const [
    questions,
    setQuestions,
    { appendElement, updateElement, deleteElementByIndex, clearArray },
  ] = useArray(study.questions);

  const createQuestion = () => {
    appendElement({ prompt: "", type: "Inclusion" });
  };

  const updateQuestion = (index, name, value) => {
    const updated = { ...questions[index], [name]: value };
    updateElement(updated, index);
  };

  const handleCancel = () => {
    setQuestions(study.questions);
    setEdit(false);
  };

  const handleSubmit = () => {
    updateStudy(study.id, { questions });
    setEdit(false);
  };

  return edit ? (
    <ScreenerEdit
      original={study.questions}
      questions={questions}
      createQuestion={createQuestion}
      updateQuestion={updateQuestion}
      deleteQuestion={deleteElementByIndex}
      deleteAllQuestions={clearArray}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
    />
  ) : (
    <ScreenerView questions={questions} setEdit={setEdit} />
  );
}

export default Screener;
