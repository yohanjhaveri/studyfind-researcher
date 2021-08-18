import { Button } from "@chakra-ui/react";
import TabHeader from "../TabHeader";
import ResourcesList from "components/feature/Study/ResourcesList/ResourcesList";

function ResourcesView({ study, setEdit }) {
  const handleEdit = () => {
    setEdit(true);
  };

  return (
    <>
      <TabHeader heading="Resources">
        <Button colorScheme="blue" onClick={handleEdit}>
          Edit Resources
        </Button>
      </TabHeader>
      <ResourcesList resources={study.resources} />
    </>
  );
}

export default ResourcesView;
