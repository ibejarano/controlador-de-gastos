import React from 'react';
import styled from 'styled-components'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ItemList = styled.li`
    background: yellow;
    margin: 1em 0;
    padding: 0.8em 1em;
    border-radius: 0.5em;

    display: flex;
    justify-content: space-between;
 
    button {
        background: none;
        border: none;
    }
`

export default function ItemStyled({ children, action, icon }) {
    return (
        <ItemList>{children}
            <button onClick={action}><FontAwesomeIcon icon={icon} /></button>
        </ItemList>
    )
}