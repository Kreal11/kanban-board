import styled from "styled-components";

export const BoardsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  max-width: 800px;
  margin: 0 auto;
`;

export const BoardsList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

export const AddBoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background-color: grey;
  width: 200px;
  height: 250px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.4s ease-in-out;

  &:hover {
    background-color: darkslategrey;
  }

  svg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
  }

  p {
    font-size: 20px;
    text-transform: uppercase;
  }
`;
