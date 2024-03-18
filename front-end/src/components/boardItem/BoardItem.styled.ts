import styled from "styled-components";

export const BoardButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

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

export const BoardLi = styled.li`
  box-sizing: border-box;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  background-color: lightsteelblue;
  height: 250px;
  max-width: 200px;
  overflow: auto;

  p {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

export const BoardInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  cursor: pointer;
  background-color: gray;
  border-radius: 8px;
  padding: 6px;
  transition: background-color 0.4s ease-in-out;

  &:hover {
    background-color: darkslategray;
  }
`;
