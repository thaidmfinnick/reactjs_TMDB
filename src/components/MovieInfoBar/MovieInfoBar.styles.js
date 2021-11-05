import styled from "styled-components";

export const Wrapper = styled.div `
    display: flex;
    align-items: center;
    min-height: 100px;
    background: var(--darkGrey);
    padding: 0 20px;
`;
export const Content = styled.div `
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    max-width: var(--maxWidth);
    width: 100%;
    margin: 0 auto;
    /* gap: 20px; */

    .column {
        text-align: center;
        background: var(--medGrey);
        border-radius: 20px;
        margin: 0 20px;

    }

    @media screen and (max-width: 768px) {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, 1fr);
        gap: 20px;
    }
`;

