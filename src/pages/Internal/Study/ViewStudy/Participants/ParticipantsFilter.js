import { Heading, SimpleGrid } from "@chakra-ui/react";
import { Card, MultiSelectInput, SelectInput } from "components";

function ParticipantsFilter({ filters, handleChangeFilter }) {
  return (
    <Card padding="20px" marginBottom="20px">
      <Heading size="md" marginBottom="15px">
        Filters
      </Heading>
      <SimpleGrid spacingY="15px">
        <MultiSelectInput
          name="status"
          label="Selected Status"
          value={filters.status}
          onChange={handleChangeFilter}
          options={[
            { label: "Interested", value: "interested" },
            { label: "Screened", value: "screened" },
            { label: "Consented", value: "consented" },
            { label: "Accepted", value: "accepted" },
            { label: "Rejected", value: "rejected" },
          ]}
        />

        <SelectInput
          name="sort"
          label="Sort by"
          value={filters.sort}
          onChange={handleChangeFilter}
          options={[
            { label: "Eligibility", value: "eligibility" },
            { label: "Status", value: "status" },
            { label: "Time Enrolled", value: "enrolled" },
          ]}
        />
      </SimpleGrid>
    </Card>
  );
}

export default ParticipantsFilter;
