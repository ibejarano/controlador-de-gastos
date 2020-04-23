import React from "react";
import styled from "styled-components";
import { DualRing } from "react-spinners-css";

const StyledButton = styled.button`
  margin-top: 1.5em;
  padding: 0.7em;
  background: ${(props) => props.theme.color.mainBackground};
  color: ${(props) => props.theme.color.yellowText};
  font-weight: bold;
  border: none;
  border-radius: 10px;
  height: 45px;
`;

const Button = ({ isSubmitting, text }) => {
  return (
    <StyledButton type="submit">
      {isSubmitting ? (
        <DualRing style={{ padding: 0, marginTop: 0 }} size={25} />
      ) : (
        text
      )}
    </StyledButton>
  );
};

export default Button;
