import React from "react";
import lodash from "lodash";

import { FormControl, Select, FormLabel, FormErrorMessage } from "@chakra-ui/react";

function Field({ name, value, label, placeholder, error, options, onChange, ...rest }) {
  return (
    <FormControl isInvalid={error} {...rest}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select
        bg={error ? "red.100" : "white"}
        textTransform="capitalize"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
      {error && lodash.isString(error) && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}

export default Field;
