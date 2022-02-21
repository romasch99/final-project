import styled from "styled-components";

export const Textarea = styled.textarea`
    min-width: 100%;
    margin-top: 0.5rem;
    min-height: 5rem;
    border: 1px solid #ddd;
    font-size: 12px;
    
    &: focus {
        border-bottom-color: #e5195f;
        outline: 0;
    }
`;
