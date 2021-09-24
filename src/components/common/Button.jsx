import styled from "styled-components";

const StyledButton = styled.button`
  background: ${(props) => props.theme.color.mainBackground};
  color: ${(props) => props.theme.color.yellowText};
  border: none;
  padding: 0.3em;
  font-weight: bold;
  font-size: 1em;
`;

export default StyledButton;
