import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

import Button from "./common/Button";

const Slider = styled.div`
  background: ${(props) => props.theme.color.walletColor};
  border-radius: 1.5em 1.5em 0em 0em;
  padding: 1em 2em;
  height: 100vh;
  position: fixed;
  top: ${(props) => (props.isOpen ? `10vh` : `100vh`)};
  left: 0;
  transition: all 0.5s ease;
  width: 100%;

  a.close {
    position: absolute;
    right: 1em;
    top: 1em;
    background: none;
    color: ${(props) => props.theme.color.yellowText};
    border: none;
    font-weight: bold;
    font-size: 1.5em;
    transition: transform 0.2s ease-in-out;
  }

  @media (min-width: 600px) {
    padding-left: 6em;
    padding-right: 6em;
  }
`;

export default function WalletDetails({ open, setOpen, children }) {
  return (
    <Slider isOpen={open}>
      {children}
      <Button
        style={{
          position: "absolute",
          top: "10px",
          left: "92%",
        }}
        onClick={() => setOpen(false)}
      >
        <FontAwesomeIcon icon={faWindowClose} size="lg" />
      </Button>
    </Slider>
  );
}
