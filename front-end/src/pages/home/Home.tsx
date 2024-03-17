import { useSelector } from "react-redux";
import { selectGetBoards } from "../../redux/board/selectors";
import { useEffect } from "react";
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
      <AddBoardWrapper>
        <svg>
          <use xlinkHref={`${sprite}#icon-plus`} />
        </svg>
        <p>Add board</p>
      </AddBoardWrapper>
      <BoardsList>
        {boards?.length &&
          boards.map((board) => <BoardItem key={board._id} {...board} />)}
      </BoardsList>
    </BoardsWrapper>
  );
};

export default Home;
