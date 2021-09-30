import React from "react";
import styled from "styled-components";
import { DualRing } from "react-spinners-css";

const StyledButton = styled.button`
  margin-top: 0.75em;
  padding: 0.34em;
  background: ${(props) => props.theme.color.walletColor};
  color: ${(props) => props.theme.color.yellowText};
  font-weight: bold;
  border: none;
  border-radius: 10px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "12px")};
  width: ${(props) => (props.fullWidth ? "100%" : "min-content")};
  max-width: 400px;
`;

const Button = ({ isSubmitting, text, fontSize, fullWidth, form }) => {
  return (
    <StyledButton
      type="submit"
      form={form}
      fontSize={fontSize}
      fullWidth={fullWidth}
    >
      {isSubmitting ? (
        <DualRing style={{ padding: 0, marginTop: 0 }} size={25} />
      ) : (
        text
      )}
    </StyledButton>
  );
};

export default Button;
