import React, { useState } from "react";
import { Heading, Button, Flex, Grid, Progress } from "@chakra-ui/react";
import { Input, FileInput } from "components";
import { storage } from "database/firebase";

function FilesEdit({ nctID, setEdit, getFiles }) {
  const [inputs, setInputs] = useState({ name: "", file: null });
  const [errors, setErrors] = useState({ name: "", file: "" });
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  const validate = (name, value) => {
    switch (name) {
      case "name":
        if (value === "") return "File name cannot be empty";
        if (value.includes("/")) return "File name cannot contain '/'";
        return "";

      case "file":
        if (value === null) return "File has not been selected";
        return "";
    }
  };

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, name: validate(name, value) }));
  };

  const handleCancel = () => {
    setEdit(false);
    setInputs({ name: "", file: null });
    setErrors({ name: "", file: "" });
  };

  const handleSelect = (e) => {
    const uploadedFile = e.target.files[0];
    setInputs({ name: uploadedFile.name, file: uploadedFile });
    setErrors({ name: "", file: "" });
  };

  const handleUpload = () => {
    const err = {
      name: validate("name", inputs.name),
      file: validate("file", inputs.file),
    };

    if (err.name || err.file) {
      setErrors(err);
      return;
    }

    setLoading(true);

    const ref = storage.ref(`study/${nctID}/${inputs.name}`);
    const task = ref.put(inputs.file);

    task.on(
      "state_changed",
      (snapshot) => {
        const filesize = snapshot.totalBytes;
        const uploaded = snapshot.bytesTransferred;
        const percent = Math.round((100 * uploaded) / filesize);
        setStatus(percent);
      },
      (error) => {
        setErrors({ file: error.message && "File cannot be larger than 5MB" });
        setLoading(false);
      },
      () => {
        setLoading(false);
        setEdit(false);
        getFiles();
      }
    );
  };

  return (
    <div>
      <Flex justify="space-between" align="center" m="15px 0">
        <Heading fontSize="28px">Upload File</Heading>
      </Flex>
      <Grid gap="16px" w="300px">
        {loading ? (
          <Progress hasStripe value={status} colorScheme="blue" />
        ) : (
          <>
            <FileInput
              label="File"
              loading={loading}
              status={status}
              error={errors.file}
              onChange={handleSelect}
              accept="application/pdf"
            />
            <Input
              label="Name"
              name="name"
              value={inputs.name}
              error={errors.name}
              onChange={handleChange}
            />
          </>
        )}
        <Flex gridGap="10px" justify="flex-end">
          <Button color="gray.500" onClick={handleCancel} isDisabled={loading}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleUpload}
            loadingText="Uploading"
            isLoading={loading}
            type="submit"
          >
            Upload
          </Button>
        </Flex>
      </Grid>
    </div>
  );
}

export default FilesEdit;