import React from "react";
import styled from "styled-components";

const StyledTitleAndSubtitle = styled.div`
  /* background: inherit; */
  max-width: 450px;
  h3 {
    color: ${(props) => props.invert? props.theme.color.purpleText: props.theme.color.yellowText};
    font-size: 1.2em;
    margin-bottom: .2em;
  }

  p {
    color: ${(props) => props.invert? props.theme.color.purpleText: props.theme.color.yellowText};
    font-size: 0.7em;
  }
`;

const TitleAndSubtitle = ({ title, subtitle, invert }) => (
  <StyledTitleAndSubtitle invert={invert} >
    <h3>{title}</h3>
    <p>{subtitle}</p>
  </StyledTitleAndSubtitle>
);

export default TitleAndSubtitle;
