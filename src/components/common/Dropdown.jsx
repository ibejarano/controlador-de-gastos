import React from "react"
import styled from "styled-components"

const StyledSelect = styled.select`
    background: ${(props) => props.theme.color.mainBackground};
    color: ${(props) => props.theme.color.yellowText};
    font-size: 16px;
    padding: 8px 4px;
`

export default function Dropdown({ options, value, handleChange }) {

    return (
        <StyledSelect name="section" value={value} onChange={handleChange}>

            {
                options.map(opt =>
                    <option key={opt} value={opt}>{opt}</option>
                )
            }
        </StyledSelect>
    )
}