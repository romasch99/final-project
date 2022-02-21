import styled from "styled-components";

export const Select = styled.select`
    min-width: 100%;
    margin-top: 0.5rem;
    max-height: 2rem;
    border: 1px solid #ddd;
    font-size: 12px;

    &: focus {
        border-bottom-color: #e5195f;
        outline: 0;
    }
`;