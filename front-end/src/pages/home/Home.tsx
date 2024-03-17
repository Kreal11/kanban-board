import { useSelector } from "react-redux";
import { selectGetBoards } from "../../redux/board/selectors";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { getAllBoardsThunk } from "../../redux/board/operations";

const Home = () => {
  const boards = useSelector(selectGetBoards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBoardsThunk());
  }, [dispatch]);

  return (
    <div>
      {boards?.length &&
        boards.map((board) => <li key={board._id}>{board.title}</li>)}
    </div>
  );
};

export default Home;
