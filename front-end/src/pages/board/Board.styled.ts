import styled from "styled-components";

export const NavBoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 40px;

  button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border-radius: 8px;
    border: none;
    padding: 8px;
    transition: background-color 0.4s ease-in-out;

    &:hover {
      background-color: darkslategray;
    }
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
