import React, { useState, useEffect } from "react";

import { storage } from "database/firebase";
import { format } from "functions";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { Loader } from "components";

import FilesGrid from "./FilesGrid";
import FilesEdit from "./FilesEdit";

function Files() {
  const toast = useToast();
  const { nctID } = useParams();

  const [edit, setEdit] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFiles = async () => {
    const { items } = await storage.ref(`study/${nctID}`).listAll();

    const tempFiles = await Promise.all(
      items.map(async (ref) => {
        const meta = await ref.getMetadata();
        const url = await ref.getDownloadURL();
        return { name: ref.name, link: url, date: format.date(meta.timeCreated) };
      })
    );

    setFiles(tempFiles);
  };

  const handleDelete = (name) => {
    storage
      .ref(`study/${nctID}/${name}`)
      .delete()
      .then(() => {
        getFiles();
      })
      .catch((error) => {
        toast({
          title: "Connection Error!",
          description: "We could not delete your file as there was a connection error",
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
      });
  };

  const initialLoad = async () => {
    setLoading(true);
    await getFiles();
    setLoading(false);
  };

  useEffect(() => {
    initialLoad();
  }, []);

  if (loading) return <Loader height="500px" />;

  return edit ? (
    <FilesEdit nctID={nctID} setEdit={setEdit} getFiles={getFiles} />
  ) : (
    <FilesGrid nctID={nctID} setEdit={setEdit} files={files} handleDelete={handleDelete} />
  );
}

export default Files;