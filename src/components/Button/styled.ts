import styled from "styled-components";

export const ButtonStyle = styled.button`
    font-size: 0.8em;
    width: 165px;
    height: 35px;
    background-color: ${props => props.color};
    padding: 9px 50px;
    border-radius: 0.8rem;
    color: white;
    border: 2px solid white;
    cursor: pointer;
`;
