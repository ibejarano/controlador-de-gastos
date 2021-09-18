import React from 'react';
import styled from 'styled-components'


const StyledList = styled.ul`
    list-style-type: none;
    padding: 0;
`

export default function ItemStyled({ children }) {
    return (
        <StyledList>{children}
        </StyledList>
    )
}