import React from "react";
import styled from "styled-components";

const ModalStyle = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  & article {
    position: relative;
    top: 30vh;
    width: 100%;
  }
`;

export default function Modal({ children }) {
  return (
    <ModalStyle>
      <article>{children}</article>
    </ModalStyle>
  );
}
