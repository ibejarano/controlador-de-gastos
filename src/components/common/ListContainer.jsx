import React from 'react';
import styled from 'styled-components'


const StyledList = styled.ul`
    list-style-type: none;
    padding: 0;
    max-width: 400px;
    margin: 0 auto;
`

export default function ItemStyled({ children }) {
    return (
        <StyledList>{children}
        </StyledList>
    )
}