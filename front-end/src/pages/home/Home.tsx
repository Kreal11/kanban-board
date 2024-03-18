import { useSelector } from "react-redux";
import { selectGetBoards } from "../../redux/board/selectors";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { getAllBoardsThunk } from "../../redux/board/operations";
import BoardItem from "../../components/boardItem/BoardItem";
import { AddBoardWrapper, BoardsList, BoardsWrapper } from "./Home.styled";
import sprite from "../../assets/icons/plus.svg";

const Home = () => {
  const boards = useSelector(selectGetBoards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBoardsThunk());
  }, [dispatch]);

  return (
    <BoardsWrapper>
      <BoardsList>
        {(!boards || boards.length === 0) && (
          <AddBoardWrapper>
            <svg>
              <use xlinkHref={`${sprite}#icon-plus`} />
            </svg>
            <p>Add board</p>
          </AddBoardWrapper>
        )}
        {boards?.length &&
          boards.map((board, index) => (
            <React.Fragment key={board._id}>
              {index === 0 && (
                <AddBoardWrapper>
                  <svg>
                    <use xlinkHref={`${sprite}#icon-plus`} />
                  </svg>
                  <p>Add board</p>
                </AddBoardWrapper>
              )}
              <BoardItem {...board} />
            </React.Fragment>
          ))}
      </BoardsList>
    </BoardsWrapper>
  );
};

export default Home;
