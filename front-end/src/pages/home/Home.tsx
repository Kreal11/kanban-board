import { useSelector } from "react-redux";
import { selectGetBoards } from "../../redux/board/selectors";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { getAllBoardsThunk } from "../../redux/board/operations";
import BoardItem from "../../components/boardItem/BoardItem";
import { BoardsWrapper } from "./Home.styled";

const Home = () => {
  const boards = useSelector(selectGetBoards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBoardsThunk());
  }, [dispatch]);

  return (
    <BoardsWrapper>
      <div>
        <p>Add board</p>
      </div>
      <ul>
        {boards?.length &&
          boards.map((board) => <BoardItem key={board._id} {...board} />)}
      </ul>
    </BoardsWrapper>
  );
};

export default Home;
