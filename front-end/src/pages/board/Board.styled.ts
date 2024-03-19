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
  max-width: 800px;
  margin: 0 auto;
  gap: 50px;
`;

export const CardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;

  h2 {
    margin-bottom: 30px;
  }
`;

export const CardList = styled.ul`
  padding: 10px;
  background-color: grey;
  width: 250px;
  border-radius: 8px;
  min-height: 400px;
`;

export const CardPlusSvg = styled.svg`
  cursor: pointer;
  background-color: white;
  border-radius: 8px;
  padding: 45px 100px;
  width: 50px;
  height: 50px;
  transition: background-color 0.4s ease-in-out, fill 0.4s ease-in-out;

  &:hover {
    background-color: darkslategrey;
    fill: white;
  }
`;
