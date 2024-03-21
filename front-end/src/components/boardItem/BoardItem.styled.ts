import styled from "styled-components";

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 14px;

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
      img {
        filter: brightness(0) invert(1);
      }
    }
  }

  img {
    width: 20px;
    height: 20px;
    transition: filter 0.4s ease-in-out;
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
  padding: 6px;

  div {
    padding: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    cursor: pointer;
    background-color: gray;
    border-radius: 8px;
    transition: background-color 0.4s ease-in-out;
    margin-bottom: 14px;

    &:hover {
      background-color: darkslategray;
    }
  }
`;
