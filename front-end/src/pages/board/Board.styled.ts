import styled from "styled-components";

type ToDo = {
  $toDo?: string;
};

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
  position: relative;

  h2 {
    margin-bottom: 30px;
  }
`;

export const CardList = styled.ul<ToDo>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  background-color: grey;
  width: 210px;
  border-radius: 8px;
  min-height: 700px;
  min-width: 230px;
  box-sizing: border-box;

  ${({ $toDo }) => $toDo === "toDo" && `padding-top: 202px;`}
`;

export const CardPlusImgWrapper = styled.div`
  cursor: pointer;
  background-color: white;
  border-radius: 8px;
  padding: 61px 80px;
  width: 50px;
  height: 50px;
  transition: background-color 0.4s ease-in-out, filter 0.4s ease-in-out;
  position: absolute;
  top: 76px;
  left: 11.5px;

  img {
    width: 50px;
    height: 50px;
  }

  &:hover {
    background-color: darkslategrey;
    img {
      filter: brightness(0) invert(1);
    }
  }
`;
