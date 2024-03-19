import styled from "styled-components";

export const HomeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-left: 0;
  margin-bottom: 40px;
  border-radius: 8px;
  border: none;
  font-size: 16px;

  transition: background-color 0.4s ease-in-out;

  &:hover {
    background-color: darkslategray;
  }
`;

export const BoardWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const CardListsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  gap: 50px;
`;

export const CardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
