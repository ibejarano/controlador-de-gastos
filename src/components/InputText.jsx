import React from "react";
import PropTypes from "prop-types";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function InputText({ label, id, variant, fieldData }) {
  return (
    <FormControl p="10px">
      <FormLabel color={variant === "secondary" ? "transparent" : "white"}>
        {label}
      </FormLabel>
      <Input
        bg={variant === "secondary" ? "transparent" : "white"}
        {...fieldData}
        id={id}
        placeholder={`Ingrese su ${label}`}
        type={id === "password" ? "password" : "text"}
      />
    </FormControl>
  );
}

InputText.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  fieldData: PropTypes.object,
};
